# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - State Toggles Context (Boss Dashboard)
**Learning:** For mutually exclusive state toggles (like Teacher Type: Full-Time vs PT), standard `<button>` tags without context are confusing for screen readers as they don't announce the relationship or current state clearly.
**Action:** Always wrap exclusive toggles in a `role="radiogroup"` container with an `aria-label`, and apply `role="radio"` and `aria-checked` to the individual buttons to provide proper context and state announcement.

## 2024-05-23 - List Context Labeling (Boss Dashboard)
**Learning:** Using generic labels like "Add Class" or "Remove" inside repeating list items (Teacher Cards, Class Configs) creates ambiguity for screen reader users who may traverse lists sequentially.
**Action:** Pass indices or names (e.g., `teacher.name`, `index + 1`) to child components to construct descriptive, unique `aria-label`s like "刪除教師 老師A" or "移除班級 1".
