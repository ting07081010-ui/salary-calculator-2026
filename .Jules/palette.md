# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2026-02-24 - Semantic Toggle Groups
**Learning:** Visual toggle buttons (like "Full Time" / "PT") often look like tabs but function as radio buttons. Using generic buttons forces screen reader users to guess the current state.
**Action:** Wrap exclusive toggle sets in `role="radiogroup"` and use `role="radio"` with `aria-checked` on the buttons to clearly communicate selection state.
