1. **Analyze UX/A11y opportunity**:
    In `src/components/boss/TeacherCard.jsx`, the button to remove a teacher is an icon-only button:
    ```jsx
    <button onClick={() => onRemove(teacher.id)} className="boss-delete-btn">
        <Trash2 className="icon-md" />
    </button>
    ```
    This button does not have an `aria-label`, so screen reader users will not know its purpose. In addition, there may be multiple teachers on the page, so just calling it "Delete" or "Remove" might be ambiguous. Following Palette's journal learning, we should provide an `aria-label` that includes the teacher's name, e.g., `aria-label={`移除老師 ${teacher.name}`}`. And we should add `aria-hidden="true"` to the `Trash2` icon.

2. **Changes**:
    Update `src/components/boss/TeacherCard.jsx` to add the `aria-label` to the remove button and `aria-hidden="true"` to the inner icon.

3. **Verify**:
    - Build and test to ensure it compiles correctly.
    - Check formatting and linting.

4. **Pre-commit**: Use `pre_commit_instructions` to ensure code meets quality standards.
5. **Submit**: Create PR with a title describing the UX improvement.
