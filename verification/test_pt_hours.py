import re
from playwright.sync_api import sync_playwright

def verify_pt_hours_controls():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        print("Navigating to page...")
        # The main.jsx logic shows that App component (salary calculator) is only shown if query or hash has 'salary'
        page.goto("http://localhost:3000/salary-calculator-2026/?salary")

        # Wait for the page to load content
        page.wait_for_selector('header')

        # Switch to PT mode
        print("Switching to PT mode...")
        # Try finding the button by its class and content "PT" directly
        pt_button = page.locator('button.mode-btn:has-text("PT")')

        if pt_button.count() > 0:
            pt_button.first.click()
        else:
            print("PT button not found by selector, dumping page content...")
            # print(page.content())
            raise Exception("PT button not found")

        # Locate the PT Extra Hours section
        print("Locating PT Extra Hours controls...")
        input_locator = page.get_by_label("非教學時數")
        plus_btn = page.get_by_label("增加時數")
        minus_btn = page.get_by_label("減少時數")

        # Check if elements exist and are visible
        # It might take a moment to appear after clicking PT
        print("Waiting for input...")
        try:
            page.wait_for_selector('input[aria-label="非教學時數"]', timeout=5000)
        except:
             print("Input not found. Is the PT mode active?")
             page.screenshot(path="verification/pt_mode_fail.png")
             raise

        if not plus_btn.is_visible():
             print("Plus button not visible immediately, waiting...")
             page.wait_for_selector('button[aria-label="增加時數"]')

        if not minus_btn.is_visible():
             print("Minus button not visible immediately, waiting...")
             page.wait_for_selector('button[aria-label="減少時數"]')

        print("Controls found.")

        # Test initial value
        initial_value = input_locator.input_value()
        print(f"Initial value: {initial_value}")

        # Ensure we start from a known state if not 0
        if initial_value == "":
            initial_value = "0"

        # Test Increment
        print("Testing Increment...")
        plus_btn.click()
        # wait for potential react update
        page.wait_for_timeout(200)
        new_value = input_locator.input_value()
        print(f"Value after increment: {new_value}")

        expected_val = int(initial_value) + 1
        if int(new_value) != expected_val:
             raise Exception(f"Increment failed. Expected {expected_val}, got {new_value}")

        # Test Decrement
        print("Testing Decrement...")
        minus_btn.click()
        page.wait_for_timeout(200)
        final_value = input_locator.input_value()
        print(f"Value after decrement: {final_value}")

        expected_final = int(initial_value)
        if int(final_value) != expected_final:
             raise Exception(f"Decrement failed. Expected {expected_final}, got {final_value}")

        # Test Decrement below zero (should stay 0)
        print("Testing Decrement logic (min 0)...")
        # Reset to 0 first
        while int(input_locator.input_value()) > 0:
            minus_btn.click()
            page.wait_for_timeout(50)

        # Try to go below 0
        minus_btn.click()
        page.wait_for_timeout(200)
        zero_value = input_locator.input_value()
        if int(zero_value) != 0:
             raise Exception(f"Decrement below zero failed. Expected 0, got {zero_value}")

        # Screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/pt_hours_verification.png")

        browser.close()
        print("Verification successful!")

if __name__ == "__main__":
    verify_pt_hours_controls()
