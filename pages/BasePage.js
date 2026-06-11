// pages/BasePage.js
import { expect } from '@playwright/test';

/**
 * BasePage — shared behavior for all Page Objects.
 * Every page/component object in pages/ extends this class.
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // ─── Navigation ─────────────────────────────────────

  /** Navigate to a path relative to baseURL (set in playwright.config.js). */
  async goto(path = '/') {
    await this.page.goto(path);
  }

  /** Wait for the page's network to go idle (useful after navigations). */
  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /** Current URL. */
  url() {
    return this.page.url();
  }

  /** Current page title. */
  async title() {
    return this.page.title();
  }

  // ─── Actions ─────────────────────────────────────

  /** Fill an input after ensuring it's visible. */
  async fill(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  /** Click an element after ensuring it's visible. */
  async click(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /** Get trimmed text from an element. */
  async getText(locator) {
    await locator.waitFor({ state: 'visible' });
    const text = await locator.textContent();
    return (text ?? '').trim();
  }

  // ─── Assertions ─────────────────────────────────────

  async expectVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async expectHidden(locator) {
    await expect(locator).toBeHidden();
  }

  async expectText(locator, expected) {
    await expect(locator).toHaveText(expected);
  }

  async expectContains(locator, expected) {
    await expect(locator).toContainText(expected);
  }
}