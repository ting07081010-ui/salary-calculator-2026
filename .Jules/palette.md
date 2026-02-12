## 2025-02-19 - Accessibility of Icon-Only Buttons
**Learning:** The application heavily relies on icon-only buttons with only `title` attributes, which provides poor accessibility for screen reader and touch users.
**Action:** Systematically audit all icon-only buttons and ensure they have explicit `aria-label` attributes, and use `aria-pressed` for toggle states.
