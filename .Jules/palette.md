# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2025-04-06 - Redundant Screen Reader Announcements in Icon-only Buttons
**Learning:** Adding an `aria-label` to an icon-only `<button>` makes it accessible, but if the child icon component (e.g., from `lucide-react`) isn't explicitly hidden from screen readers, some screen readers might announce both the button's label and try to read the SVG, causing redundant or confusing announcements.
**Action:** When implementing icon-only buttons using `lucide-react` or similar SVG icon libraries, always add `aria-hidden="true"` to the icon component and provide the descriptive `aria-label` on the parent `<button>`.
