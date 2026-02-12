"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Voiceflow Widget
// ---------------------------------------------------------------------------

export function VoiceflowWidget() {
  useEffect(() => {
    // Get project ID from environment variable
    const projectID = process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID;

    if (!projectID) {
      console.warn("Voiceflow Project ID not set in environment variables");
      return;
    }

    // Load Voiceflow script dynamically
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function () {
      // @ts-ignore - Voiceflow global
      if (window.voiceflow && window.voiceflow.chat) {
        // @ts-ignore
        window.voiceflow.chat.load({
          verify: { projectID },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      }
    };

    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.onerror = () => {
      console.error("Failed to load Voiceflow widget");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector(
        'script[src="https://cdn.voiceflow.com/widget/bundle.mjs"]',
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Voiceflow provides its own launcher button, so we don't render anything
  return null;
}
