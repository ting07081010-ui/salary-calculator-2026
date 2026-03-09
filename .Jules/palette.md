# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-08-01 - Icon-Only Buttons Accessibility
**Learning:** Screen readers might announce the SVG name or nothing at all for buttons that contain only an icon and no text. Adding an `aria-label` to the button and `aria-hidden="true"` to the internal SVG ensures the button's action is clearly communicated while hiding the decorative icon from screen readers.
**Action:** Always ensure icon-only buttons have an `aria-label` attribute, and ensure the internal `<svg>` element has `aria-hidden="true"`.
