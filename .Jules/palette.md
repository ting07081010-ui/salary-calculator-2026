# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2024-03-24 - Dynamic Text Aria Labels
**Learning:** When a button contains dynamic, visible text (like changing from 'Share' to 'Copied'), adding a static `aria-label` attribute to the button shadows the text, preventing screen readers from announcing the dynamic state changes.
**Action:** Only apply `aria-hidden="true"` to the decorative icons within these buttons and allow the dynamically changing text content to serve as the accessible name.
