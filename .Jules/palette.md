# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2025-02-12 - Icon-only Buttons and Radiogroups
**Learning:** Icon-only buttons relying purely on `title` attributes are often not properly read by screen readers. Furthermore, a toggle between two exclusive modes (like Teacher Type: Full-time vs. PT) is semantically a radio group, not simply a group of buttons.
**Action:** Always add explicit `aria-label` to icon-only buttons (and `aria-hidden="true"` to their internal SVG icons). Use `role="radiogroup"` for the container and `role="radio"` with `aria-checked` on the option buttons for exclusive toggles.
