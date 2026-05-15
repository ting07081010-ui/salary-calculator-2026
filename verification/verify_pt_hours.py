from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173/salary-calculator-2026/')

    # Navigate to the main calculator
    page.get_by_role('link', name='薪資計算器 計算正職/PT').click()
    page.wait_for_selector('h1', state='visible')

    # Click PT toggle using role button
    page.get_by_role('button', name='PT').click()

    # Wait for the PT section to appear
    page.wait_for_selector('.pt-extra-section', state='visible')

    # Check if decrement button is disabled
    dec_btn = page.get_by_role('button', name='減少非教學時數')
    print("Decrement button disabled at 0:", dec_btn.is_disabled())

    # Click increment button
    inc_btn = page.get_by_role('button', name='增加非教學時數')
    inc_btn.click()

    # Check if decrement button is enabled now
    print("Decrement button disabled at 1:", dec_btn.is_disabled())

    # Read value
    input_field = page.get_by_role('spinbutton', name='非教學時數')
    print("Input value:", input_field.input_value())

    page.screenshot(path='verification/pt_hours_verification.png')
    browser.close()
