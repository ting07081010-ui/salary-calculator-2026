# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Touch-Friendly Numeric Controls
**Learning:** Mobile and touch-screen users often struggle with precise numeric inputs like `type="range"`, finding it difficult to select exact values or drag sliders accurately.
**Action:** Always wrap standard numeric or range inputs with explicitly sized, touch-friendly increment and decrement controls (e.g., `+` and `-` buttons) to improve touch usability and provide an accessible alternative for precise value selection. Ensure these controls are disabled at their boundary values to provide clear UX state feedback.
