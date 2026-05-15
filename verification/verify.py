from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:4173/salary-calculator-2026/")
    page.wait_for_timeout(2000)

    # In Home screen, click on "薪資計算器"
    page.get_by_role("link", name="薪資計算器 計算正職/PT").click()
    page.wait_for_timeout(2000)

    # Now we should be on the calculator page
    # Check the aria-checked states of the radio buttons
    ft_btn = page.get_by_role("radio", name="正職")
    pt_btn = page.get_by_role("radio", name="PT")

    print("FT aria-checked:", ft_btn.get_attribute("aria-checked"))
    print("PT aria-checked:", pt_btn.get_attribute("aria-checked"))

    pt_btn.click()
    page.wait_for_timeout(500)

    print("FT aria-checked:", ft_btn.get_attribute("aria-checked"))
    print("PT aria-checked:", pt_btn.get_attribute("aria-checked"))

    # Also hover over toolbar buttons to show them
    export_img_btn = page.get_by_role("button", name="匯出成圖片")
    export_img_btn.hover()
    page.wait_for_timeout(500)

    page.screenshot(path="verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
