import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/telemetry
 *
 * Receives anonymous component events from the docs site and the CLI.
 * Validates the payload, then inserts into Supabase.
 *
 * When SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are not yet set,
 * events are logged to the console so you can verify the pipeline
 * is working before connecting the database.
 */

const VALID_EVENTS = ["page_view", "copy", "download"] as const;
type EventType = (typeof VALID_EVENTS)[number];

interface TelemetryBody {
  event_type: EventType;
  component: string;
  session_id?: string;
  tab?: string;
  referrer?: string;
  cli_version?: string;
}

// ── Supabase lazy client ───────────────────────────────────────
// Only imported when credentials are present so the route works
// in dev without a Supabase project configured yet.

async function insertEvent(data: TelemetryBody) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // No DB yet — log so the dev can verify the pipeline works
    console.log("[telemetry] (no DB configured) event:", data);
    return;
  }

  // Dynamically import to avoid bundling when unused
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("component_events").insert({
    event_type: data.event_type,
    component: data.component,
    session_id: data.session_id ?? null,
    tab: data.tab ?? null,
    referrer: data.referrer ?? null,
    cli_version: data.cli_version ?? null,
  });

  if (error) {
    // Log server-side only — never surface to the user
    console.error("[telemetry] insert error:", error.message);
  }
}

// ── Handler ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: TelemetryBody = await req.json();

    // Basic validation
    if (!body.event_type || !body.component) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    if (!VALID_EVENTS.includes(body.event_type)) {
      return NextResponse.json({ error: "Unknown event type" }, { status: 400 });
    }

    // Sanitise — ensure no PII sneaks in
    const safe: TelemetryBody = {
      event_type: body.event_type,
      component: String(body.component).slice(0, 100),
      session_id: body.session_id ? String(body.session_id).slice(0, 64) : undefined,
      tab: body.tab ? String(body.tab).slice(0, 20) : undefined,
      referrer: body.referrer ? String(body.referrer).slice(0, 200) : undefined,
      cli_version: body.cli_version ? String(body.cli_version).slice(0, 20) : undefined,
    };

    // Fire insert — don't await if Supabase is slow; respond immediately
    insertEvent(safe).catch(() => {});

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    // Malformed JSON etc. — silently swallow
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}

// Reject non-POST
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
