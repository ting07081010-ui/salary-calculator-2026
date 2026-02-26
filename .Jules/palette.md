# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2026-02-26 - Accessible Controls
**Learning:** Custom toggle buttons and icon-only buttons often lack semantic meaning for assistive technologies. Visual cues (colors, icons) are insufficient.
**Action:** Use `role="radiogroup"`/`role="radio"` with `aria-checked` for exclusive toggles. Always provide `aria-label` for icon-only buttons and hide decorative icons with `aria-hidden="true"`.
