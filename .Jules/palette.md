# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2024-05-24 - Collapsible Content Accessibility
**Learning:** Collapsible sections need specific ARIA attributes to be usable by screen readers. `aria-expanded` indicates state, and `aria-controls` paired with an `id` on the content area links the toggle to the content. Decorative icons inside buttons should have `aria-hidden="true"`.
**Action:** Always use `useId()` to map `aria-controls` to content `id` for expanding sections like settings panels.
