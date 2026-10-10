import type { ShapeName } from "@/lib/sculpture";

/**
 * Shared, mutable state for the particle sculpture. It lives outside React on
 * purpose: pointer, scroll and project selection write to it, the render loop
 * reads it every frame, and nothing re-renders.
 */

export type SlotKind = "hero" | "projects";

export interface Slot {
  el: HTMLElement;
  kind: SlotKind;
}

export interface SculptureState {
  slots: Set<Slot>;
  /** Shape the Projects slot should show */
  projectShape: ShapeName;
  /** Pointer in viewport px */
  pointer: { x: number; y: number; moved: boolean };
  /** 1 while the visitor is holding the pointer down on the sculpture */
  holdTarget: number;
  /** The loop keeps running until this timestamp (performance.now ms) */
  activeUntil: number;
  lite: boolean;
  /** Restarts the render loop after it went to sleep (set by the scene) */
  wake: () => void;
}

export const sculpture: SculptureState = {
  slots: new Set(),
  projectShape: "orb",
  pointer: { x: -9999, y: -9999, moved: false },
  holdTarget: 0,
  activeUntil: 0,
  lite: false,
  wake: () => {},
};

/** Keep rendering for a while after any input, then sleep. */
export function nudge(ms = 1800) {
  sculpture.activeUntil = Math.max(sculpture.activeUntil, performance.now() + ms);
  sculpture.wake();
}

export function registerSlot(el: HTMLElement, kind: SlotKind) {
  const slot: Slot = { el, kind };
  sculpture.slots.add(slot);
  nudge();
  return () => {
    sculpture.slots.delete(slot);
    nudge();
  };
}

export function setProjectShape(shape: ShapeName) {
  if (sculpture.projectShape === shape) return;
  sculpture.projectShape = shape;
  nudge(2500);
}
