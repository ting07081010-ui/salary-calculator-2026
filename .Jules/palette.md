# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Exclusive Option Toggles Accessibility
**Learning:** For toggles that behave like radio buttons (where only one option can be selected at a time, such as "Teacher Type"), using generic buttons without proper ARIA roles makes it difficult for screen reader users to understand the relationship between the options and their current state.
**Action:** Always group exclusive option buttons within a container using `role="radiogroup"` with a descriptive `aria-label`, and use `role="radio"` with `aria-checked` on the individual buttons to clearly communicate state.
