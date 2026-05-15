# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2024-05-11 - Accordion Accessibility Pattern
**Learning:** React components implementing expandable/collapsible sections need proper ARIA state tracking for screen reader users to understand their behavior. Setting just `onClick` is not sufficient, as users cannot determine if a section is currently expanded or which section the button controls. Also, multiple decorative icons within these controls can be verbose if not explicitly hidden.
**Action:** When creating expanding sections (like `SettingsSection`), always use `useId()` to generate a unique ID for the content panel, bind it using `aria-controls` on the toggle button, set `aria-expanded={isOpen}` to reflect the state, and apply `aria-hidden="true"` to any decorative icons within the toggle button.
