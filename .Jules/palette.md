# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-24 - Touch-Friendly Number Inputs
**Learning:** Mobile and touch-screen users often struggle with precise numeric inputs. The default browser number input controls (spinners) are often too small to reliably tap, especially on mobile devices.
**Action:** Always wrap standard numeric inputs with explicitly sized, touch-friendly increment and decrement controls (e.g., + and - buttons) to improve touch usability. Ensure these buttons have `type="button"` to prevent form submission and appropriate `aria-label` attributes for accessibility.
