from playwright.sync_api import sync_playwright, expect
import os

def test_teacher_card(page):
    # Setup session storage to bypass PinGuard for boss route
    page.goto('http://localhost:5173/salary-calculator-2026/')

    page.evaluate("""() => {
        sessionStorage.setItem('auth_session_boss', 'true');
        sessionStorage.setItem('auth_timestamp_boss', Date.now().toString());
    }""")

    page.goto('http://localhost:5173/salary-calculator-2026/?boss')

    # Wait for the teacher card to render
    teacher_card = page.locator('.boss-teacher-card').first
    expect(teacher_card).to_be_visible()

    # Capture a screenshot of the first Teacher Card
    teacher_card.screenshot(path='/app/verification/teacher_card_accessibility.png')
    print("Screenshot saved to /app/verification/teacher_card_accessibility.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            test_teacher_card(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path='/app/verification/error.png')
        finally:
            browser.close()
