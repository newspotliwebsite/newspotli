/**
 * Shared Framer Motion animation presets for News Potli.
 *
 * Tuned for 3G / budget-phone performance:
 * - Short durations (max 0.4s)
 * - GPU-only properties (opacity + transform)
 * - `once: true` on all viewport triggers (observe → fire → disconnect)
 * - No spring physics (too CPU-heavy on low-end)
 */

import type { Variants } from 'motion/react'

// ── Easing ──
export const EASE_OUT = [0, 0, 0.2, 1] as const

// ── Durations ──
export const DURATION_FAST = 0.25
export const DURATION_NORMAL = 0.4
export const DURATION_SLOW = 0.6

// ── Viewport trigger config — fire once, early ──
export const VIEWPORT_ONCE = { once: true, amount: 0.15 } as const

// ── Variant Presets ──

/** Fade up from 24px below */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT },
  },
}

/** Fade in (opacity only — lightest animation) */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_FAST, ease: EASE_OUT },
  },
}

/** Scale in from 0.95 + fade */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT },
  },
}

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT },
  },
}

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_NORMAL, ease: EASE_OUT },
  },
}

/** Stagger container — wraps children that each have their own variants */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

/** Stagger container — faster, for grids with many items */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}
