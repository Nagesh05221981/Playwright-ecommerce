// pages/ConfirmationPage.js
import { BasePage } from './BasePage.js';

export class ConfirmationPage extends BasePage {
  constructor(page) {
    super(page);

    this.heading     = page.locator('h1');
    this.orderId     = page.locator('#order-id');
    this.itemNames   = page.locator('.item-name');
    this.grandTotal  = page.locator('.total-line.grand .val');
    this.detailCards = page.locator('.dcard');
  }

  detailCard(title) {
    return this.detailCards.filter({ hasText: title });
  }
}