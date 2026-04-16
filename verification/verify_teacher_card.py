from playwright.sync_api import sync_playwright, expect
import time

def verify_teacher_card(page):
    # Navigate to the Boss route directly
    base_url = "http://localhost:5173/salary-calculator-2026/?boss"

    # Inject session state before navigation to bypass PinGuard
    page.goto("http://localhost:5173/salary-calculator-2026/")
    page.evaluate("sessionStorage.setItem('auth_session_boss', 'true')")
    page.evaluate("sessionStorage.setItem('auth_timestamp_boss', Date.now().toString())")

    page.goto(base_url)

    # Wait for the BossDashboard to load. Check elements that might exist
    page.wait_for_timeout(2000)

    # Find the TeacherCard
    teacher_card = page.locator(".boss-teacher-card").last
    expect(teacher_card).to_be_visible()

    # Verify the delete button has the aria-label
    # For the second default teacher (老師B), they are already PT
    delete_btn = teacher_card.locator("button.boss-delete-btn")
    expect(delete_btn).to_have_attribute("aria-label", "刪除教師 老師 B")

    # Verify the pt basic hours input has the aria-label
    pt_hours_input = teacher_card.locator("input.boss-pt-hours-input")
    expect(pt_hours_input).to_have_attribute("aria-label", "教師 老師 B 的非教學時數")

    print("All ARIA label assertions passed!")

    # Take a screenshot
    page.screenshot(path="verification/teacher_card_aria.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            verify_teacher_card(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
