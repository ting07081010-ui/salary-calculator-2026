# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-06-05 - Touch-Friendly Numeric Controls
**Learning:** Mobile and touch-screen users often struggle with precise numeric inputs. Relying solely on the native browser spinbuttons within `<input type="number">` creates small, hard-to-hit tap targets that negatively impact UX and accessibility. Adding explicit increment/decrement controls greatly improves usability, but these controls must explicitly convey boundary states (e.g., `disabled` when at 0) to avoid user frustration.
**Action:** Always wrap standard numeric inputs with explicitly sized, touch-friendly increment and decrement controls (e.g., `+` and `-` buttons) to improve touch usability. Ensure these controls are properly ARIA-labeled and utilize the `disabled` attribute at boundaries to communicate state limits clearly.
