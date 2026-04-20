import time
from playwright.sync_api import sync_playwright

def verify_ui_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # 建立 context 以避免嚴格模式，並設置較大的視窗以避免 RWD 問題導致按鈕消失
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            # 依據 memory 提示，應存取 /salary-calculator-2026/
            page.goto("http://localhost:5173/salary-calculator-2026/", timeout=60000)

            # 等待載入完成
            page.wait_for_selector('text=薪資試算系統 2026')

            print("Navigating to Salary Calculator mode...")

            # 依據 memory 點擊指定連結前往計算機
            calculator_link = page.get_by_role('link', name='薪資計算器')
            if calculator_link.count() == 0:
                 # 若有其他文案，抓取卡片連結
                 calculator_link = page.locator('a.home-nav-card.card-blue')
            calculator_link.click()

            # 等待 Header 工具列出現
            page.wait_for_selector('.toolbar-btn', timeout=10000)

            print("Taking screenshot of Salary Calculator mode...")
            page.screenshot(path="verification/header_verification.png", full_page=False)

            print("Navigating to Boss Dashboard mode...")
            # 回到首頁並進入 Boss 模式
            page.goto("http://localhost:5173/salary-calculator-2026/?boss")

            # 由於有 PinGuard，可能需要 Bypass (依據 memory)
            print("Bypassing PinGuard...")
            page.evaluate("""
                sessionStorage.setItem('auth_session_boss', 'true');
                sessionStorage.setItem('auth_timestamp_boss', Date.now().toString());
            """)
            page.reload()

            # 等待載入
            page.wait_for_selector('.boss-header', timeout=10000)

            print("Taking screenshot of Boss Dashboard mode...")
            page.screenshot(path="verification/boss_dashboard_verification.png", full_page=False)

            print("Verification script completed.")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    verify_ui_changes()
