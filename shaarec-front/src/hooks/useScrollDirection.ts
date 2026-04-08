"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 10) {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < threshold) return;
      setHidden(y > lastY && y > 80);
      setLastY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, threshold]);

  return hidden;
}
