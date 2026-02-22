from playwright.sync_api import sync_playwright

def verify_aria_labels():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app with salary calculator
        page.goto("http://localhost:5173/salary-calculator-2026/?salary")

        # Wait for ClassCard to load (it should be there by default)
        page.wait_for_selector(".class-card")

        # 1. Verify Delete Button ARIA Label
        delete_btn = page.locator(".delete-btn").first
        aria_label_delete = delete_btn.get_attribute("aria-label")
        print(f"Delete Button ARIA Label: {aria_label_delete}")
        assert aria_label_delete == "刪除班級 1", f"Expected '刪除班級 1', got '{aria_label_delete}'"

        # Verify Icon inside Delete Button is hidden
        delete_icon = delete_btn.locator("svg")
        aria_hidden_icon = delete_icon.get_attribute("aria-hidden")
        print(f"Delete Icon ARIA Hidden: {aria_hidden_icon}")
        assert aria_hidden_icon == "true", f"Expected 'true', got '{aria_hidden_icon}'"

        # 2. Verify Frequency Toggle Group
        freq_group = page.locator(".frequency-toggle").first
        role_group = freq_group.get_attribute("role")
        aria_label_group = freq_group.get_attribute("aria-label")
        print(f"Freq Group Role: {role_group}")
        print(f"Freq Group ARIA Label: {aria_label_group}")
        assert role_group == "group", f"Expected 'group', got '{role_group}'"
        assert aria_label_group == "班級 1 頻率設定", f"Expected '班級 1 頻率設定', got '{aria_label_group}'"

        # Verify Frequency Buttons aria-pressed
        full_btn = freq_group.locator("button").nth(0)
        single_btn = freq_group.locator("button").nth(1)

        # Assuming default is 'full'
        aria_pressed_full = full_btn.get_attribute("aria-pressed")
        aria_pressed_single = single_btn.get_attribute("aria-pressed")
        print(f"Full Button ARIA Pressed: {aria_pressed_full}")
        print(f"Single Button ARIA Pressed: {aria_pressed_single}")

        # The exact value might depend on default state, but we check if attribute exists and is boolean-ish
        assert aria_pressed_full in ["true", "false"], f"Expected 'true' or 'false', got '{aria_pressed_full}'"
        assert aria_pressed_single in ["true", "false"], f"Expected 'true' or 'false', got '{aria_pressed_single}'"

        # 3. Verify Student Count Slider
        student_slider = page.locator(".range-slider").first
        aria_label_slider = student_slider.get_attribute("aria-label")
        print(f"Student Slider ARIA Label: {aria_label_slider}")
        assert aria_label_slider == "班級 1 學生人數", f"Expected '班級 1 學生人數', got '{aria_label_slider}'"

        # Take screenshot
        page.screenshot(path="verification/class_card_verification.png")
        print("Verification screenshot saved to verification/class_card_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_aria_labels()
