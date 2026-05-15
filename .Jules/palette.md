# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2026-04-26 - Accessible Collapsible Sections
**Learning:** Collapsible sections need explicit ARIA links between the toggle button and the content area so screen reader users know what they are opening and if it's currently open. Missing these makes the UI difficult to navigate via assistive tech.
**Action:** Always implement collapsible sections using the `useId()` hook in React to generate dynamic `aria-controls` values. Combine this with `aria-expanded` on the toggle button and `aria-hidden="true"` on the decorative toggle icons.
