import { test, expect } from '@playwright/test';

test("check deleteCustomers API", async ({ page }) => {
  await page.route("**/apis/checkdeleteCustomers", async (route) => {
    try {
      console.log("Route intercepted, attempting fetch...");
      const response = await route.fetch(); // Keep page open here
      console.log("Fetch successful, processing response...");
      const body = await response.json();
      console.log("Response received:", body);
      await route.fulfill({ json: { ...body, modified: true } });
    } catch (err) {
      console.error("Route fetch failed:", err);
      await route.abort();
    }
  });
  await page.goto("https://www.mychoize.com/signin");
  await page.getByPlaceholder("1 (702) 123-").click();
  await page.getByPlaceholder("1 (702) 123-").fill("+91 0000000000");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(5000)
});