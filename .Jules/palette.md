# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-24 - Unique Labels in Nested Data Structures
**Learning:** In highly nested UIs (like Teacher -> Classes), applying unique accessible names must incorporate relevant context to make interactions like "Remove Class" meaningful (e.g. including the class type or student count) while also adhering to WCAG 2.5.3 (Label in Name) by maintaining the visible text within the `aria-label`.
**Action:** Ensure that nested list items (such as nested classes inside a teacher card) have unique `aria-label`s for all interactive controls, including redundant icons hidden via `aria-hidden="true"`.
