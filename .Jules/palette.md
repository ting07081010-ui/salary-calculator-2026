# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Async State & Exclusive Toggles Communication
**Learning:** Screen readers need explicit hints for dynamically changing UI or loading states, and toggle buttons acting as mutually exclusive options should not be just normal buttons.
**Action:** Always add `aria-busy={isLoading}` to buttons performing async actions (like image generation) to communicate that the element is busy. For exclusive options (e.g. Teacher Type toggle), use `role="radiogroup"` on the container and `role="radio"` with `aria-checked` on the buttons for clear context.
