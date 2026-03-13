# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2026-03-13 - State-Dependent Button ARIA Labels
**Learning:** When adding `aria-label` to a button whose inner text changes based on its state (e.g., a toggle button that switches between "Full" and "Single"), a static `aria-label` will override the inner text for screen readers, preventing users from hearing the current state.
**Action:** Ensure the `aria-label` dynamically includes the state text (e.g., `aria-label={...: ${stateText}}`) or use `aria-describedby`.
