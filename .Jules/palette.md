# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2026-05-16 - Redundant Announcements on Icon Buttons
**Learning:** When using icon-only buttons (like the Trash2 delete button), placing an `aria-label` on the button container is necessary, but screen readers may still try to announce the internal SVG if it lacks `aria-hidden="true"`, causing redundant or confusing announcements.
**Action:** Always pair `aria-label` on the `<button>` element with `aria-hidden="true"` on the internal `<svg>` element for true icon-only controls.
