# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Accordion Accessibility
**Learning:** Config panels and settings sections that can expand or collapse must communicate their state to screen readers to be accessible. Simply visually hiding/showing the content leaves keyboard and screen reader users confused about the result of their action.
**Action:** Always add `aria-expanded` reflecting the state (true/false) and `aria-controls` referencing the ID (via `useId()`) of the content container on the toggle button. Also ensure decorative icons inside these toggles have `aria-hidden="true"`.
