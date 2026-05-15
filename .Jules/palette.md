# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2025-04-18 - Improve accessibility in TeacherCard components
**Learning:** Found an accessibility issue pattern where custom toggle buttons acting as mutually exclusive options (like Full Time vs PT) lack the semantic `radiogroup` and `radio` roles, making them confusing for screen readers. Additionally, decorative icons and inline input fields often miss `aria-hidden` and `aria-label` respectively.
**Action:** Always add `role="radiogroup"` to the container and `role="radio"` with `aria-checked` to the custom buttons when implementing exclusive option toggles. Ensure all unlabelled input fields have an `aria-label` and purely decorative icons use `aria-hidden="true"`.
