# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Prevent Redundant Announcements for Icon Buttons
**Learning:** For icon-only buttons built with SVG components (like Lucide React), adding `aria-label` to the parent `<button>` is not enough. If the internal `<svg>` isn't explicitly hidden, some screen readers might try to announce both the button's label and the SVG itself (or its title), leading to confusing, redundant announcements.
**Action:** Always add `aria-hidden="true"` to the decorative/icon component inside an icon-only button, alongside the `aria-label` on the parent `<button>`.
