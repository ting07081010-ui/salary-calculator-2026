from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to the app - salary mode
        print("Navigating to salary app...")
        page.goto("http://localhost:5173/salary-calculator-2026/?salary")

        # Wait for header to be visible
        try:
            page.wait_for_selector("header.header", timeout=10000)
        except Exception as e:
            print(f"Error waiting for header: {e}")
            page.screenshot(path="error.png")
            print("Screenshot saved to error.png")
            return

        # Check Home link aria-label
        home_link = page.locator("a[href='/']")
        home_label = home_link.get_attribute("aria-label")
        print(f"Home link aria-label: {home_label}")

        if home_label != "回首頁":
            print("ERROR: Home link missing correct aria-label")

        # Check Mode buttons aria-pressed
        full_time_btn = page.locator("button.mode-btn-active-ft")
        ft_pressed = full_time_btn.get_attribute("aria-pressed")
        print(f"Full time button aria-pressed: {ft_pressed}")

        if ft_pressed != "true":
             print("ERROR: Full time button missing aria-pressed=true")

        # Check Toolbar buttons aria-label
        # Camera button
        camera_btn = page.locator("button[title='匯出圖片']")
        camera_label = camera_btn.get_attribute("aria-label")
        print(f"Camera button aria-label: {camera_label}")

        if camera_label != "匯出圖片":
             print("ERROR: Camera button missing correct aria-label")

        # Take screenshot of the header
        header = page.locator("header.header")
        header.screenshot(path="header_verification.png")
        print("Screenshot saved to header_verification.png")

        browser.close()

if __name__ == "__main__":
    run()
