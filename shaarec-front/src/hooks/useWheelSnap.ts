"use client";

import { useEffect, useRef } from "react";

/**
 * Snap au scroll molette entre les .snap-section
 * Chaque tick de molette = une section, pas de blocage
 * Desktop only (>= 1024px)
 */
export function useWheelSnap(containerSelector: string) {
  const cooldown = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const container = document.querySelector(containerSelector) as HTMLElement | null;
    if (!container) return;

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>(".snap-section"));

    const getCurrentIndex = (sections: HTMLElement[]) => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      let closest = 0;
      let minDist = Infinity;

      for (let i = 0; i < sections.length; i++) {
        const dist = Math.abs(sections[i].offsetTop - scrollTop);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }

      // Si on a scrollé plus de 30% de la section, on considère qu'on est sur la suivante
      const sectionTop = sections[closest].offsetTop;
      if (scrollTop > sectionTop + containerHeight * 0.3 && closest < sections.length - 1) {
        closest++;
      }

      return closest;
    };

    const onWheel = (e: WheelEvent) => {
      // Ignorer les petits mouvements (trackpad inertie)
      if (Math.abs(e.deltaY) < 30) return;

      e.preventDefault();

      if (cooldown.current) return;
      cooldown.current = true;

      const sections = getSections();
      const current = getCurrentIndex(sections);
      const direction = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(sections.length - 1, current + direction));

      if (next !== current) {
        sections[next].scrollIntoView({ behavior: "smooth" });
      }

      // Cooldown court — permet le spam rapide
      setTimeout(() => {
        cooldown.current = false;
      }, 200);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [containerSelector]);
}
