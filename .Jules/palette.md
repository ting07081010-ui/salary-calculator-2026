# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Exclusive Option Toggles Accessibility
**Learning:** Standard toggle buttons visually indicate state, but for exclusive options (like "Full-Time" vs "PT"), screen reader users need context about the grouping and exclusivity of the choices.
**Action:** Implement exclusive option toggles using `role="radiogroup"` for the container with an `aria-label`, and `role="radio"` with `aria-checked` on the individual buttons to provide proper context and state information.
