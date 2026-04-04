# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2026-04-04 - Expand/Collapse State Feedback
**Learning:** When building custom accordion or toggle sections, screen readers need explicit state notification to understand if content is currently visible or hidden.
**Action:** Always add the `aria-expanded={boolean}` attribute to the trigger button controlling a collapsible section to communicate its current visibility state.
