from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:5173/salary-calculator-2026/?salary")
    page.wait_for_timeout(1000)

    # Click on the PT mode toggle button
    page.locator(".mode-btn").nth(1).click()
    page.wait_for_timeout(500)

    # Click on the Full-time mode toggle button
    page.locator(".mode-btn").nth(0).click()
    page.wait_for_timeout(500)

    # Take screenshot at the final state
    page.screenshot(path="/home/jules/verification/screenshots/header_verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()  # MUST close context to save the video
            browser.close()
