// pages/CheckoutPage.js
import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    // Step 1: Cart Review
    this.cartItemNames = page.locator('.cart-item-name');
    this.toDeliveryBtn = page.locator('#btn-to-2');

    // Step 2: Delivery
    this.shippingOption = page.locator('#opt-shipping');
    this.pickupOption   = page.locator('#opt-pickup');
    this.locationCards  = page.locator('.location-card');
    this.dateChips      = page.locator('.date-chip');
    this.timeChips      = page.locator('.time-chip');
    this.toPaymentBtn   = page.locator('#btn-to-3');

    // Step 3: Payment
    this.cardNumber  = page.locator('#cc-number');
    this.cardName    = page.locator('#cc-name');
    this.cardExpiry  = page.locator('#cc-exp');
    this.cardCvv     = page.locator('#cc-cvv');
    this.toReviewBtn = page.locator('#sec-3 .next-btn');

    // Step 4: Review & Place Order
    this.reviewDelivery = page.locator('#review-delivery');
    this.reviewPayment  = page.locator('#review-payment');
    this.reviewItems    = page.locator('#review-items');
    this.placeOrderBtn  = page.locator('#sec-4 .next-btn');
  }

  async proceedToDelivery() {
    await this.click(this.toDeliveryBtn);
  }

  async selectShipping() {
    await this.click(this.shippingOption);
  }

  async selectPickup() {
    await this.click(this.pickupOption);
  }

  async selectStore(storeName) {
    await this.click(this.locationCards.filter({ hasText: storeName }));
  }

  async selectFirstAvailableDate() {
    await this.click(this.dateChips.first());
  }

  async selectFirstAvailableTime() {
    await this.click(this.timeChips.first());
  }

  async proceedToPayment() {
    await this.click(this.toPaymentBtn);
  }

  async fillPayment(payment) {
    await this.fill(this.cardNumber, payment.cardNumber);
    await this.fill(this.cardName, payment.cardholderName);
    await this.fill(this.cardExpiry, payment.expiry);
    await this.fill(this.cardCvv, payment.cvv);
  }

  async proceedToReview() {
    await this.click(this.toReviewBtn);
  }

  async placeOrder() {
    await this.click(this.placeOrderBtn);
  }
}