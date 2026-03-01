# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Responsive Buttons with Hidden Text
**Learning:** Responsive buttons that hide their text on smaller screens (like `.toolbar-btn-text` in `.toolbar-btn`) become effectively icon-only to screen readers on those screen sizes unless `aria-label` is provided, as the text is set to `display: none;` which removes it from the accessibility tree.
**Action:** Always add an explicit `aria-label` to buttons whose text content may be visually hidden via CSS media queries. Additionally, hide the accompanying decorative or functional icon from screen readers using `aria-hidden="true"` to prevent redundant or confusing announcements.

## 2024-05-23 - Custom Toggles as Radiogroups
**Learning:** Groups of buttons used to select one out of multiple options (like mode toggles for Teacher Type) are semantically identical to radio buttons. Using a `<div role="radiogroup">` with inner `<button role="radio" aria-checked="...">` clearly communicates this structure and current state to assistive technologies, distinguishing them from standard independent buttons or toggle buttons (`aria-pressed`).
**Action:** Implement `role="radiogroup"` on containers and `role="radio"` with `aria-checked` on children for mutually exclusive selection UI patterns that use non-native radio inputs.
