from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:4173/salary-calculator-2026/")
    page.wait_for_timeout(3000)
    print("Inner text of body:")
    print(page.locator("body").inner_text()[:500])
    browser.close()
