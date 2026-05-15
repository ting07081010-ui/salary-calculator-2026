# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2026-04-10 - Adding Accessible Context to Boss Dashboard Buttons
**Learning:** Icon-only buttons (like Trash icons) and generic text buttons (like "Remove") within mapped lists lack adequate context for screen readers in the boss dashboard. Specifically, buttons targeting specific items in an array require unique identifiers (e.g., `teacher.name`) in their `aria-label`s. Additionally, decorative icons inside buttons must have `aria-hidden="true"` to prevent redundant reading. Toggle buttons without structural roles (like the ops cost parameter toggle) require `aria-expanded` to indicate state.
**Action:** When implementing icon-only controls or generic action buttons inside dynamically rendered lists, always combine action text with the item's unique identifier in the `aria-label`. Hide child SVG icons with `aria-hidden="true"`. Enforce `aria-expanded` on standalone content-toggling buttons.
