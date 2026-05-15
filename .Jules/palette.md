# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2024-04-24 - Standardizing ARIA on interactive/standalone elements
**Learning:** Found multiple instances where standalone interactive inputs lacked context or icon-only buttons lacked descriptions. The `aria-busy` state was also not explicitly communicated for async UI feedback like image generation.
**Action:** Always verify components missing direct text labels (icon-only actions, bare numeric inputs) get explicit `aria-label`s, ensure loading/busy states get `aria-busy`, and ensure all decorative SVG icons have `aria-hidden="true"`.
