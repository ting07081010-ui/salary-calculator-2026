# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-11-20 - Adding Accessibility Attributes
**Learning:** Custom toggle buttons and icon-only buttons need proper ARIA roles and labels to ensure screen readers can announce them. Icon SVGs within buttons should have `aria-hidden="true"` to prevent screen readers from reading out the elements inside them. The `role="radiogroup"` and `role="radio"` combined with `aria-checked` accurately convey the state of mutually exclusive toggle groups.
**Action:** Consistently apply `aria-label` to icon-only buttons and set `aria-hidden="true"` on their SVGs. Use `role="radiogroup"`, `role="radio"`, and `aria-checked` for custom toggles.
