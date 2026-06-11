// test-data/users.js
import data from '../fixtures/users.json' with { type: 'json' };

/** The default test user (read from fixtures/users.json). */
export function defaultUser() {
  return { ...data.defaultUser };
}

/** Payment details for checkout (read from fixtures/users.json). */
export function paymentDetails() {
  return { ...data.payment };
}

/** Product to use in checkout tests (read from fixtures/users.json). */
export function defaultProduct() {
  return { ...data.product };
}

/** Multiple products for cart tests (read from fixtures/users.json). */
export function productsList() {
  return data.products.map(p => ({ ...p }));
}

/** Pickup details for store pickup tests (read from fixtures/users.json). */
export function pickupData() {
  return { ...data.pickup };
}