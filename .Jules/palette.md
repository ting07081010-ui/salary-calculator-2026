# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2026-04-25 - Improve TeacherCard Accessibility
**Learning:** Radio button groups within mapped lists need specific aria-labels (e.g. including the item's name) to avoid duplicate or ambiguous announcements. Icon-only delete buttons and PT hours inputs in the TeacherCard lacked semantic meaning for screen readers.
**Action:** Replaced generic div toggles with `role="radiogroup"` and `role="radio"` along with `aria-checked`. Added dynamic `aria-label` attributes to the inputs and buttons using the teacher's name. Hid purely decorative icons with `aria-hidden="true"`.
