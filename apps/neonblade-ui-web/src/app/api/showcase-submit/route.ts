import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { Resend } from "resend";
import { getAdminDb } from "@/lib/firebase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SubmissionPayload {
  displayName: string;
  email: string;
  country: string;
  projectLink: string;
  description: string;
  components: string[];
  feedback: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidUrl(url: string) {
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let payload: SubmissionPayload;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const {
    displayName,
    email,
    country,
    projectLink,
    description,
    components,
    feedback,
  } = payload;

  // Server-side validation
  if (!displayName?.trim()) {
    return NextResponse.json(
      { error: "Display name is required." },
      { status: 400 },
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (!country?.trim()) {
    return NextResponse.json(
      { error: "Country is required." },
      { status: 400 },
    );
  }
  if (!projectLink || !isValidUrl(projectLink)) {
    return NextResponse.json(
      { error: "Invalid project URL." },
      { status: 400 },
    );
  }
  if (!Array.isArray(components) || components.length < 2) {
    return NextResponse.json(
      { error: "At least 2 components must be selected." },
      { status: 400 },
    );
  }

  // 1. Save to Firestore (primary action)
  try {
    await getAdminDb()
      .collection("showcase-submissions")
      .add({
        displayName: displayName.trim(),
        email: email.trim().toLowerCase(),
        country: country.trim(),
        projectLink: projectLink.trim(),
        description: description?.trim() ?? "",
        components,
        feedback: feedback?.trim() ?? "",
        status: "pending",
        createdAt: FieldValue.serverTimestamp(),
      });
  } catch (err) {
    console.error("[showcase-submit] Firestore error:", err);
    return NextResponse.json(
      { error: "Failed to save submission. Please try again." },
      { status: 500 },
    );
  }

  // 2. Send confirmation email (secondary, non-blocking)
  try {
    const { error: resendError } = await resend.emails.send({
      from: "NeonBlade UI <noreply@neuronrush.com>",
      to: email.trim().toLowerCase(),
      subject: "Showcase submission received — NeonBlade UI",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
          <body style="margin:0;padding:0;background:#050505;font-family:'Segoe UI',sans-serif;color:#ededed;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:48px 0;">
              <tr>
                <td align="center">
                  <table width="560" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(0,243,255,0.12);max-width:560px;width:100%;">

                    <!-- Header -->
                    <tr>
                      <td style="padding:28px 40px;border-bottom:1px solid rgba(0,243,255,0.08);">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="vertical-align:middle;">
                              <img src="https://neonbladeui.neuronrush.com/neonblade_ui_logo_official.png" alt="NeonBlade UI" width="175" height="25" style="display:block;filter:drop-shadow(0 0 6px rgba(0,243,255,0.7));" />
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:32px 40px;">
                        <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                          Submission Received
                        </h1>
                        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:rgba(237,237,237,0.65);">
                          Thanks for submitting your project to the NeonBlade UI Showcase. We&apos;ve received your submission and it&apos;s now under review.
                        </p>
                        <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:rgba(237,237,237,0.65);">
                          <strong style="color:#ededed;">Submitted project:</strong>
                          <br />
                          <a href="${projectLink.trim()}" style="color:#00f3ff;text-decoration:none;">${projectLink.trim()}</a>
                        </p>

                        <!-- Divider -->
                        <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(0,243,255,0.25),transparent);margin:24px 0;"></div>

                        <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:rgba(237,237,237,0.45);">
                          The creator of NeonBlade UI will review your project. If it&apos;s selected for the showcase, you&apos;ll be notified at this email address.
                        </p>
                        <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(237,237,237,0.3);">
                          Please note: not all submissions are guaranteed to be featured. Selection is subject to review and approval.
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);">
                        <p style="margin:0 0 4px;font-size:12px;color:rgba(237,237,237,0.25);">
                          NeonBlade UI &mdash; Free &amp; open-source futuristic React UI components.
                        </p>
                        <p style="margin:0;font-size:11px;color:rgba(237,237,237,0.15);">
                          &copy; ${new Date().getFullYear()} NeonBlade UI. All rights reserved.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });
    if (resendError) {
      console.error("[showcase-submit] Resend error:", resendError);
    }
  } catch (err) {
    // Email failure is non-critical — log but don't fail the request
    console.error("[showcase-submit] Resend exception:", err);
  }

  return NextResponse.json({ success: true });
}
