# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-24 - Touch-Friendly Controls for Numeric Inputs
**Learning:** Mobile and touch-screen users often struggle with precise numeric inputs. Relying purely on the browser's default increment/decrement controls inside `<input type="number">` is insufficient for good UX.
**Action:** Always wrap standard numeric inputs with explicitly sized, touch-friendly increment and decrement controls (e.g., `+` and `-` buttons), using clear `aria-label`s and `type="button"`. Disable the decrement button when at the minimum boundary (e.g., `0`) to provide clear visual state feedback.
