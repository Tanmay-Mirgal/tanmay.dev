import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, on the client only. Every GSAP consumer imports from here
// so plugins are never registered twice and ScrollTrigger stays a single instance.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

let refreshCall: gsap.core.Tween | null = null;

/**
 * Convex sections resolve at different times and change the page height.
 * Components call this after they create triggers; calls are debounced into
 * a single ScrollTrigger.refresh() so start/end positions stay accurate.
 */
export function scheduleScrollRefresh() {
  if (typeof window === "undefined") return;
  refreshCall?.kill();
  refreshCall = gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
