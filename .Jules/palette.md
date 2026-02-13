## 2025-05-18 - Header Accessibility Improvements
**Learning:** Icon-only buttons and toggle groups were missing accessible names and state. Adding `aria-label`, `role="group"`, and `aria-pressed` significantly improved accessibility without changing the visual design.
**Action:** Always check icon-only buttons for `aria-label` and use `aria-pressed` for toggle/segmented control patterns.
