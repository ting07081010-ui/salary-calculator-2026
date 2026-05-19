# Palette's Journal

A collection of critical UX and Accessibility learnings.

## 2024-05-23 - Unique Labels in Lists
**Learning:** Screen readers announce controls by their accessible name. In lists of identical items (like class cards), generic labels like "Delete" or "Hours" become ambiguous ("Delete what?").
**Action:** Always append a unique identifier (like index or ID) to `aria-label` for controls in list items (e.g., "Delete Class 1").

## 2024-05-23 - Accessible Icon-Only Buttons
**Learning:** Depending solely on `title` attributes for icon-only buttons (like Share, Export, Delete, Home) often results in an ambiguous or completely absent announcement for screen reader users, especially when the context is dynamic (like a loading state). Furthermore, internal SVG elements might be redundantly announced if they aren't hidden.
**Action:** Always provide an explicit, descriptive `aria-label` for icon-only buttons. When the button state changes (e.g. loading), use `aria-busy` to convey this dynamically. Add `aria-hidden="true"` to the internal `<svg>` element to prevent duplicate announcements.

## 2024-05-23 - Avoid Shadowing Dynamic Text
**Learning:** Adding a static `aria-label` to a button that contains dynamically changing, visible text (e.g., a copy button that updates text from "Share" to "Copied") will shadow the text. Screen readers will only announce the static label, preventing users from hearing the dynamic state changes.
**Action:** Do not use `aria-label` on buttons that already have sufficient visible text. Rely on the text content to provide the accessible name so dynamic changes are correctly announced.
