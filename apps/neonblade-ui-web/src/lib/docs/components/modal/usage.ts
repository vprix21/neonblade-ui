const usage = `"use client";

import { useState } from "react";
import NeonModal from "@/lib/components/ui/elements/Modal";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <NeonModal
        open={open}
        onClose={() => setOpen(false)}
        color="cyan"
        corner="bottom-right"
        animation="slide"
        glowIntensity="medium"
        scanLine
        header={{ label: "System Alert", title: "Confirm Action" }}
        footer={{
          align: "right",
          children: (
            <>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => setOpen(false)}>Confirm</button>
            </>
          ),
        }}
      >
        Are you sure you want to proceed? This action cannot be undone.
      </NeonModal>
    </>
  );
}`;

export default usage;
