// tests/checkout.spec.js
import { test, expect } from '../support/base-test.js';
import { paymentDetails, defaultProduct } from '../test-data/users.js';

test('user can add a product and complete checkout', async ({ home, checkout, confirmation }) => {
  const payment = paymentDetails();
  const product = defaultProduct();

  // Open the store
  await home.open();

  // 1. Add a product to cart and go to checkout
  await home.addToCart(product.name);
  expect(await home.cartBadgeCount()).toBe(1);
  await home.goToCheckout();

  // 2. Cart Review — verify item and proceed
  await expect(checkout.cartItemNames.first()).toContainText(product.name);
  await checkout.proceedToDelivery();

  // 3. Delivery — select shipping
  await checkout.selectShipping();
  await checkout.proceedToPayment();

  // 4. Payment — fill card details
  await checkout.fillPayment(payment);
  await checkout.proceedToReview();

  // 5. Review — verify summary
  await expect(checkout.reviewItems).toContainText(product.name);
  await expect(checkout.reviewDelivery).toContainText('Standard Shipping');
  await expect(checkout.reviewPayment).toContainText(payment.cardNumber.slice(-4));

  // 6. Place order and verify confirmation
  await checkout.placeOrder();
  await expect(confirmation.heading).toHaveText('Order Confirmed!');
  await expect(confirmation.orderId).not.toBeEmpty();
  await expect(confirmation.itemNames.first()).toContainText(product.name);
});