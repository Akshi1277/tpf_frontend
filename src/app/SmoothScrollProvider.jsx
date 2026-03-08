"use client";

import { useEffect, createContext, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Disable GSAP's own lagSmoothing — Lenis handles this
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
      // ✅ Prevent Lenis from fighting with ScrollTrigger on non-scroll elements
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
    });

    lenisRef.current = lenis;

    // ✅ Use a named RAF fn so we can cleanly remove it on teardown
    const rafFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);

    // ✅ Throttle ScrollTrigger.update — runs on every scroll event otherwise
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.update();
        rafId = null;
      });
    };
    lenis.on("scroll", onScroll);

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

    const handleRouteChange = () => ScrollTrigger.refresh();
    window.addEventListener("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("routeChangeComplete", handleRouteChange);
      lenis.off("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      gsap.ticker.remove(rafFn);     // ✅ Remove exact fn reference, not lenis.raf
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