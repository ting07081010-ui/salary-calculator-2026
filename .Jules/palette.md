# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2025-01-20 - Numeric Input Touch Controls
**Learning:** Mobile and touch-screen users often struggle with precise numeric inputs. The native `<input type="number">` up/down arrows are frequently too small to reliably tap, resulting in poor user experience, especially for frequent interactions like adjusting hours.
**Action:** Always wrap standard numeric inputs with explicitly sized, touch-friendly increment and decrement controls (buttons) to drastically improve usability and accessibility on non-desktop devices.
