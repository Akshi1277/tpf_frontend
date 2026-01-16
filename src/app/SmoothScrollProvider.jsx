"use client";

import { useEffect, createContext } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollContext = createContext(null);

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // --- CRITICAL: Sync Lenis with GSAP ticker ---
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // --- Connect ScrollTrigger to Lenis ---
    lenis.on("scroll", () => ScrollTrigger.update());

    ScrollTrigger.scrollerProxy("body", {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    // --- Fix for Next route changes ---
    const handleRouteChange = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("routeChangeComplete", handleRouteChange);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={true}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
