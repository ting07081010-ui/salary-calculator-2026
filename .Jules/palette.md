## 2026-02-19 - Custom Toggle Accessibility
**Learning:** The app uses custom `div` containers with `button` children for toggle controls (e.g., Frequency, Teacher Type) without semantic roles, making them inaccessible to screen readers.
**Action:** Wrap custom toggle groups in `role="group"` with an `aria-label` describing the choice, and use `aria-pressed` on the individual buttons to indicate selected state.
