/**
 * Shared animation presets for News Potli.
 *
 * Based on Emil Kowalski's design engineering philosophy:
 * - Custom strong easing curves (not default CSS easings)
 * - Asymmetric timing: enter deliberate, exit snappy
 * - GPU-only properties (opacity + transform)
 * - once: true on viewport triggers (observe → fire → disconnect)
 * - prefers-reduced-motion respected
 *
 * Performance tuned for 3G / budget Android phones:
 * - UI animations under 300ms
 * - No spring physics on scroll-triggered (CPU-heavy on low-end)
 * - Springs only for interactive gestures (drag, press)
 */

import type { Variants } from 'motion/react'

// ── Easing (Emil's custom curves — stronger than CSS defaults) ──
// "Built-in CSS easings are too weak. They lack the punch
//  that makes animations feel intentional."

/** Strong ease-out: starts fast, decelerates hard. Use for ENTERING elements. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** Strong ease-in-out: for on-screen movement/morphing */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

/** iOS-like drawer curve */
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const

// ── Durations ──
// "UI animations should stay under 300ms."
export const DURATION_PRESS = 0.15    // button press feedback
export const DURATION_TOOLTIP = 0.15  // tooltips, small popovers
export const DURATION_FAST = 0.2      // dropdowns, selects
export const DURATION_NORMAL = 0.3    // modals, drawers, section reveals
export const DURATION_EXIT = 0.15     // exits are FASTER than enters

// ── Viewport trigger config — fire once, early ──
export const VIEWPORT_ONCE = { once: true, amount: 0.15 } as const

// ── Variant Presets ──

/** Fade up from 20px below — the workhorse entrance */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT },
  },
}

/** Fade in (opacity only — lightest possible animation) */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_FAST, ease: EASE_OUT },
  },
}

/** Scale in from 0.96 + fade — never from scale(0) */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT },
  },
}

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT },
  },
}

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT },
  },
}

/** Stagger container — 60ms between children (sweet spot per Emil: 30-80ms) */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
}

/** Fast stagger — for grids with many items (40ms gap) */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}

// ── Interactive presets (for whileHover / whileTap) ──

/** Button/card press feedback — 0.97 scale, fast */
export const pressFeedback = {
  whileHover: { scale: 1.02, transition: { duration: DURATION_PRESS, ease: EASE_OUT } },
  whileTap: { scale: 0.97, transition: { duration: DURATION_PRESS, ease: EASE_OUT } },
} as const

/** Subtle card hover lift */
export const hoverLift = {
  whileHover: { y: -6, transition: { duration: DURATION_FAST, ease: EASE_OUT } },
} as const
