# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-24 - Touch-Friendly Controls for Numeric Inputs
**Learning:** On mobile/touch devices, users often struggle with precise numeric inputs since native step controls are small and hard to tap. Furthermore, inputs need explicit accessible names for screen readers when they lack an associated label.
**Action:** When adding numeric inputs, especially those frequently used on mobile, always wrap them with explicitly sized, touch-friendly increment (`+`) and decrement (`-`) controls and ensure correct screen-reader accessibility by providing appropriate `aria-label` attributes for both buttons and inputs.
