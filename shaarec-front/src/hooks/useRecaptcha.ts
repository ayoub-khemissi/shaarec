"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

let scriptLoaded = false;

export function useRecaptcha() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!SITE_KEY) return;
    if (scriptLoaded) {
      setReady(!!window.grecaptcha);
      return;
    }
    scriptLoaded = true;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha?.ready(() => setReady(true));
    };
    document.head.appendChild(script);
  }, []);

  const execute = async (action: string): Promise<string> => {
    if (!SITE_KEY || !window.grecaptcha) return "";
    return window.grecaptcha.execute(SITE_KEY, { action });
  };

  return { ready, execute };
}
