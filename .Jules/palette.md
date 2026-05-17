# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2026-05-17 - Communicating Async State and Icon-Only Buttons
**Learning:** For dynamic loading states (like generating an image) to be communicated to screen readers, the `aria-busy` attribute must be applied to the button dynamically. Also, icon-only buttons (or those relying purely on a `title` attribute) need an explicit `aria-label` on the button and `aria-hidden="true"` on the SVG itself to prevent screen readers from reading raw SVG markup or ignoring the button's intent.
**Action:** Always use `aria-label` for icon-only buttons alongside `aria-hidden="true"` on the inner SVG. When buttons trigger async actions, dynamically toggle `aria-busy={isLoading}`.
