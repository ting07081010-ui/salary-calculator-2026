# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").
## 2024-04-19 - Adding ARIA attributes to Header controls and inputs
**Learning:** Found that the app uses custom icon-only buttons for toolbars and custom div layouts for radio-style toggles. These require explicit `aria-label` additions and `role="radiogroup"` / `role="radio"` mappings to ensure screen readers can announce them correctly. Also noted that standalone inputs without labels (like in PTExtraHours) need `aria-label`s.
**Action:** Always add explicit `aria-label`s to interactive `lucide-react` icons wrapped in buttons. When converting standard UI components like divs into toggle groups, ensure `role` and `aria-checked` are properly mapped. Add `aria-label` to naked inputs.
