# Palette's Journal - Critical UX/A11y Learnings

This journal tracks critical accessibility and UX patterns discovered while improving the application.

## Format
Each entry follows:
`## YYYY-MM-DD - [Title]`
**Learning:** [Insight]
**Action:** [Application]

---

## 2024-02-21 - Unique Labels for List Items
**Learning:** Interactive elements repeated in a list (like inputs in ClassCard) must have unique ARIA labels (e.g., incorporating the index) to be distinguishable by screen readers.
**Action:** When iterating over a list of components, always pass a unique identifier (like index or ID) to child components to use in `aria-label` or `id` attributes.
