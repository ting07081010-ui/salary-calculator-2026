# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-24 - Custom Exclusive Option Toggles
**Learning:** Custom UI toggles that act like radio buttons (mutually exclusive options, like Teacher Type: Full-time vs PT) need explicit ARIA roles to be understood correctly by screen readers.
**Action:** Always use `role="radiogroup"` on the container and `role="radio"` with `aria-checked` on the individual buttons to convey the exclusive selection state.
