"use client";

import { useEffect, createContext, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export const SmoothScrollContext = createContext(null);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
    });

    lenisRef.current = lenis;

    // ✅ GSAP ticker gives seconds — multiply by 1000 for Lenis (expects ms)
    const rafFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);

    // ✅ Sync ScrollTrigger passively — no scrollerProxy fighting Lenis
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    const handleRouteChange = () => {
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    window.addEventListener("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("routeChangeComplete", handleRouteChange);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      ScrollTrigger.killAll();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
}