// tests/cart.spec.js
import { test, expect } from '../support/base-test.js';
import { defaultProduct, productsList } from '../test-data/users.js';

test('cart shows correct fields and values for a single product', async ({ home }) => {
  const product = defaultProduct();
  const qty = 1;
  const expectedSubtotal = product.price * qty;
  const expectedTotal = expectedSubtotal;

  await home.open();

  // Add product and verify badge
  await home.addToCart(product.name);
  expect(await home.cartBadgeCount()).toBe(qty);

  // Open drawer and validate every field
  await home.openCart();
  expect(await home.drawerItemCount()).toBe(qty);
  expect(await home.drawerItemQty(product.name)).toBe(String(qty));
  expect(await home.drawerItemSubtotal(product.name)).toBe(`$${expectedSubtotal.toFixed(2)}`);
  expect(await home.drawerTotalAmount()).toBe(`$${expectedTotal.toFixed(2)}`);
});

test('cart shows correct fields and values for multiple products', async ({ home }) => {
  const products = productsList();
  const qty = 1;

  await home.open();

  // Add all products
  for (const product of products) {
    await home.addToCart(product.name);
  }

  // Verify badge equals total quantity added
  expect(await home.cartBadgeCount()).toBe(products.length * qty);

  // Open drawer and validate each item
  await home.openCart();
  expect(await home.drawerItemCount()).toBe(products.length);

  let expectedTotal = 0;
  for (const product of products) {
    const expectedSubtotal = product.price * qty;
    expect(await home.drawerItemQty(product.name)).toBe(String(qty));
    expect(await home.drawerItemSubtotal(product.name)).toBe(`$${expectedSubtotal.toFixed(2)}`);
    expectedTotal += expectedSubtotal;
  }

  // Validate cart total is sum of all items
  expect(await home.drawerTotalAmount()).toBe(`$${expectedTotal.toFixed(2)}`);
});