# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2026-05-12 - Improve accessibility of icon-only buttons
**Learning:** In the Header component's toolbar, multiple icon-only buttons relied solely on `title` attributes. Adding explicit `aria-label`s on the buttons, `aria-hidden="true"` on the Lucide React SVG icons, and `aria-busy` for async states ensures proper screen reader announcement and prevents redundant DOM noise.
**Action:** Always verify icon-only buttons have explicit `aria-label` attributes and use `aria-hidden` on decorative icons.
