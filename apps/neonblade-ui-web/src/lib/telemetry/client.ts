/**
 * NeonBlade UI — Client-side telemetry utility
 *
 * Fire-and-forget: events are sent in the background and never
 * block the user. All failures are silently swallowed.
 *
 * Telemetry is opt-out. Users can disable it by setting
 *   NEXT_PUBLIC_NEONBLADE_TELEMETRY=false
 * in their environment, or by calling telemetry.disable() which
 * stores a flag in localStorage.
 */

const ENDPOINT = "/api/telemetry";
const OPT_OUT_KEY = "neonblade_telemetry_disabled";
const SESSION_KEY = "neonblade_session_id";

// ── Session ID ─────────────────────────────────────────────────
// A random UUID stored in sessionStorage — anonymous, resets
// each browser session, never tied to any user identity.
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

// ── Opt-out check ──────────────────────────────────────────────
function isOptedOut(): boolean {
  // Env var takes priority (build-time opt-out)
  if (process.env.NEXT_PUBLIC_NEONBLADE_TELEMETRY === "false") return true;

  // localStorage runtime opt-out
  try {
    return localStorage.getItem(OPT_OUT_KEY) === "true";
  } catch {
    return false;
  }
}

// ── Event types ────────────────────────────────────────────────
export type TelemetryEventType = "page_view" | "copy" | "cli_copy";

export interface TelemetryPayload {
  event_type: TelemetryEventType;
  component: string;
  tab?: "usage" | "source" | "css";
  referrer?: string;
}

// ── Core send function ─────────────────────────────────────────
function send(payload: TelemetryPayload): void {
  if (isOptedOut()) return;
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    ...payload,
    session_id: getSessionId(),
  });

  // Use sendBeacon when available (survives page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
  } else {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Silently ignore — telemetry must never surface errors to users
    });
  }
}

// ── Public API ─────────────────────────────────────────────────
export const telemetry = {
  /** Track a component doc page view. */
  pageView(component: string): void {
    send({
      event_type: "page_view",
      component,
      referrer:
        typeof document !== "undefined" ? document.referrer || "direct" : undefined,
    });
  },

  /** Track a copy button click on Usage / Source / CSS tab. */
  copy(component: string, tab: "usage" | "source" | "css"): void {
    send({ event_type: "copy", component, tab });
  },

  /** Disable telemetry for this browser (persisted). */
  disable(): void {
    try {
      localStorage.setItem(OPT_OUT_KEY, "true");
    } catch {
      // ignore
    }
  },

  /** Re-enable telemetry for this browser. */
  enable(): void {
    try {
      localStorage.removeItem(OPT_OUT_KEY);
    } catch {
      // ignore
    }
  },

  /** Check current opt-out status. */
  isDisabled(): boolean {
    return isOptedOut();
  },
};
