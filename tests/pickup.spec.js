// tests/pickup.spec.js
import { test, expect } from '../support/base-test.js';
import { defaultProduct, paymentDetails, pickupData } from '../test-data/users.js';

test('user can order a product and schedule a store pickup', async ({ home, checkout, confirmation }) => {
  const product = defaultProduct();
  const payment = paymentDetails();
  const pickup = pickupData();

  // Open the store
  await home.open();

  // 1. Add product and go to checkout
  await home.addToCart(product.name);
  await home.goToCheckout();

  // 2. Cart Review
  await checkout.proceedToDelivery();

  // 3. Delivery — select store pickup and schedule
  await checkout.selectPickup();
  await checkout.selectStore(pickup.storeName);
  await checkout.selectFirstAvailableDate();
  await checkout.selectFirstAvailableTime();
  await checkout.proceedToPayment();

  // 4. Payment
  await checkout.fillPayment(payment);
  await checkout.proceedToReview();

  // 5. Review — verify pickup details flow through
  await expect(checkout.reviewDelivery).toContainText(pickup.storeName);
  await expect(checkout.reviewItems).toContainText(product.name);

  // 6. Place order and verify confirmation
  await checkout.placeOrder();
  await expect(confirmation.heading).toHaveText('Order Confirmed!');
  await expect(confirmation.orderId).not.toBeEmpty();
  await expect(confirmation.detailCard('Pickup Location')).toContainText(pickup.storeName);
  await expect(confirmation.detailCard('Pickup Schedule')).toBeVisible();
  await expect(confirmation.itemNames.first()).toContainText(product.name);
});