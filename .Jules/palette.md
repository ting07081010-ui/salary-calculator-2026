# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2025-04-12 - Teacher Type Exclusive Toggles
**Learning:** Exclusive toggle buttons (like switching between Full-Time and PT teacher types) require different ARIA attributes than standalone buttons or non-exclusive toggle groups. They need `role="radiogroup"` on the container and `role="radio"` with `aria-checked` on the buttons.
**Action:** Used `role="radiogroup"` and `role="radio"` for exclusive choices instead of `role="group"` and `aria-pressed`. Also ensured decorative icons within lists (`Timer`, `Plus`, `Trash2`) have `aria-hidden="true"`.
