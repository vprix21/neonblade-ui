"use client";

import { useEffect } from "react";
import { telemetry } from "@/lib/telemetry/client";

/**
 * Fires a single page_view telemetry event when the component
 * doc page mounts. Rendered inside the server page component.
 */
export function PageViewTracker({ component }: { component: string }) {
  useEffect(() => {
    telemetry.pageView(component);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
