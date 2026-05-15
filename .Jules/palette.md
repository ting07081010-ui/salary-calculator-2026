# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Custom Increment/Decrement Controls
**Learning:** Native `type="number"` inputs are notoriously difficult to use precisely on touch devices. Adding custom increment/decrement controls greatly improves the mobile UX, but placing custom `<button>` elements near forms often accidentally triggers form submission if `type="button"` is omitted.
**Action:** When creating custom stepper controls around inputs, always explicitly add `type="button"` to the wrapper controls to prevent accidental form submission bugs.
