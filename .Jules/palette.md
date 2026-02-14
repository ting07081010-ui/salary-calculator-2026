## 2026-02-14 - Unique Labels in Lists
**Learning:** Repetitive components in a list (like `ClassCard`) create ambiguous accessible names for controls (e.g., multiple "Delete" buttons).
**Action:** Always incorporate a unique identifier (like `index + 1`) into `aria-label` for controls inside list items (e.g., "Delete Class 1").
