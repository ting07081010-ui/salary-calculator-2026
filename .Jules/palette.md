# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-24 - Exclusive Toggles and Label in Name (WCAG 2.5.3)
**Learning:**
1. UI components acting as exclusive toggles (e.g., switching between Full-Time and PT teacher types) need `role="radiogroup"` on their container and `role="radio"` with `aria-checked` on the buttons for screen readers to correctly convey their behavior, unlike standard state toggles.
2. When adding an `aria-label` to a button that contains visible text (e.g., a "Share" button showing text + an icon), the `aria-label` *must* include the visible text to comply with WCAG 2.5.3 (Label in Name).
**Action:** Use `role="radiogroup"`/`role="radio"` for exclusive option toggles. Always ensure the text content of a button is included in its `aria-label` if one is provided.
