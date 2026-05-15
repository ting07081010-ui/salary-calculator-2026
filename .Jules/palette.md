# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2026-04-03 - Touch Usability for Range Inputs
**Learning:** Mobile and touch-screen users often struggle with precise numeric inputs on small `type="range"` sliders. Relying solely on the slider thumb can lead to poor usability when exact values (like student counts) are required. Additionally, event values (`e.target.value`) from range inputs are often strings, which can cause unexpected behavior in arithmetic operations if not cast.
**Action:** When working with numeric inputs or range sliders, always wrap them with explicitly sized, touch-friendly increment and decrement controls (e.g., + and - buttons). Cast the state value to a number (`Number(value)`) before performing arithmetic operations to avoid string concatenation bugs, and properly disable controls when boundaries are reached.
