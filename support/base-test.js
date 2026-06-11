import {test as base , expect} from '@playwright/test'
import {HomePage} from '../pages/HomePage'
import { AuthModal } from '../pages/AuthModal'
import { CheckoutPage } from '../pages/CheckoutPage'
import { ConfirmationPage } from '../pages/ConfirmationPage'
/**
 * Extended Playwright test with page objects pre-instantiated as fixtures.
 *
 * Usage:
 *   import { test, expect } from '../support/base-test.js';
 *
 *   test('something', async ({ home, authModal }) => {
 *     await home.open();
 *     ...
 *   });
 */
export const test = base.extend({
  home: async ({ page }, use) => {
    const home = new HomePage(page);
    await use(home);
  },

  authModal: async ({ page }, use) => {
    const authModal = new AuthModal(page);
    await use(authModal);
  },

  checkout: async ({ page }, use) => {
    const checkout = new CheckoutPage(page);
    await use(checkout);
  },

  confirmation: async ({ page }, use) => {
    const confirmation = new ConfirmationPage(page);
    await use(confirmation);
  },
});
export { expect };



