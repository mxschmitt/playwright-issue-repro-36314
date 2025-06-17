import { test, expect } from '@playwright/test';

test('Repro: route.fetch() hangs', async ({ page }) => {
  await page.route('**/a/auth/login', async (route) => {
    console.log('Route intercepted, attempting fetch...'); // 👈 Logs this but hangs
    const response = await route.fetch(); // ❌ Stuck here
    const body = await response.json();
    await route.fulfill({ json: { ...body, modified: true } });
  });

  await page.goto('https://example.com/login');
  await page.click('button#login'); // Triggers the intercepted request
});