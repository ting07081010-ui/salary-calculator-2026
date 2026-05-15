from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to the app base URL
        page.goto("http://localhost:5173/salary-calculator-2026/")

        # Bypass PinGuard for the boss route
        page.evaluate("""() => {
            sessionStorage.setItem('auth_session_boss', 'true');
            sessionStorage.setItem('auth_timestamp_boss', Date.now().toString());
        }""")

        # Navigate to the protected boss route
        page.goto("http://localhost:5173/salary-calculator-2026/?boss")

        # Wait a moment for rendering
        page.wait_for_timeout(2000)

        # Wait for the teacher card to appear (we don't know the exact default name)
        # We can just look for the radio group directly
        radio_group = page.locator('div[role="radiogroup"]').first
        expect(radio_group).to_be_visible()

        # Find the PT button and click it to ensure the input field is visible
        pt_btn = radio_group.locator('button[role="radio"]', has_text="PT")
        pt_btn.click()

        # Verify the input exists and has the correct aria-label
        pt_input = page.locator('input[aria-label="非教學時數"]').first
        expect(pt_input).to_be_visible()

        # Verify delete button has aria-label starting with "刪除教師"
        delete_btn = page.locator('button[aria-label^="刪除教師"]').first
        expect(delete_btn).to_be_visible()

        # Screenshot the result
        page.screenshot(path="verification/teacher_card.png")
        print("Verification complete.")

        browser.close()

if __name__ == "__main__":
    run()
