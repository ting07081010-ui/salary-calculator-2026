# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-24 - Expandable Sections State
**Learning:** For expanding/collapsing sections (like config panels or accordions), toggle buttons must use the `aria-expanded` attribute to accurately communicate their current visibility state to screen readers.
**Action:** Always add `aria-expanded={isOpen}` to buttons that toggle the visibility of adjacent content sections.
