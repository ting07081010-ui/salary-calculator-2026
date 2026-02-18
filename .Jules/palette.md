## 2025-05-20 - Adding unique ARIA labels to list items
**Learning:** In a list of identical components (like ClassCards), generic ARIA labels (e.g., "Remove class") are insufficient because they don't distinguish *which* class is being removed.
**Action:** Always append a unique identifier (like the index or ID) to the aria-label in lists, e.g., "Remove class (Class 1)".
