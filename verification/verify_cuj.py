from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Navigate to app
    page.goto("http://localhost:4173/salary-calculator-2026/")
    page.wait_for_timeout(2000)

    # Click the main calculator link from the landing page
    # Memory says: "To navigate from the Home screen to the main calculator in Playwright UI tests, click the appropriate link using page.get_by_role('link', name='薪資計算器 計算正職/PT') to ensure successful routing."
    page.get_by_role("link", name="薪資計算器 計算正職/PT").click()
    page.wait_for_timeout(2000)

    # Now we are in the main calculator. Click "PT" mode button.
    page.get_by_role("button", name="PT").click()
    page.wait_for_timeout(1000)

    # Scroll into view if needed
    page.evaluate("window.scrollBy(0, 300)")

    # Increment PT Extra hours to 2
    page.get_by_role("button", name="增加非教學時數").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="增加非教學時數").click()
    page.wait_for_timeout(1000)

    # Take screenshot at state 2
    page.screenshot(path="verification/screenshots/verification.png")

    # Decrement PT Extra hours back to 0
    page.get_by_role("button", name="減少非教學時數").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="減少非教學時數").click()
    page.wait_for_timeout(1000)

    # Try to decrement below 0 (should be disabled)
    page.get_by_role("button", name="減少非教學時數").click(force=True)

    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("verification/videos", exist_ok=True)
    os.makedirs("verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos",
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
