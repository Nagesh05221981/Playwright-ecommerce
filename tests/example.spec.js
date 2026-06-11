// @ts-check
import {test,expect} from '@playwright/test';
test.describe("Playwright demo", () => {
test.beforeEach("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
  // wait for page and verify title contains 
})

test ("get started link",async ({ page }) => {
  //await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();


})
})