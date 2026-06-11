// tests/login.spec.js
import { test, expect } from '../support/base-test.js';
import { defaultUser } from '../test-data/users.js';

test('user can sign up then log in', async ({ home, authModal }) => {
  const user = defaultUser();

  // Open the site
  await home.open();

  // 1. Sign up — creates the account (NOVA stores users in localStorage)
  await home.openSignup();
  await authModal.signUp(user);
  await authModal.waitForClosed();

  // Signup auto-logs you in; log out so we can test the login path next
  await home.logout();
  expect(await home.isLoggedIn()).toBe(false);

  // 2. Log in with the same credentials
  await home.openLogin();
  await authModal.login(user);
  await authModal.waitForClosed();

  // 3. Verify logged in
  expect(await home.isLoggedIn()).toBe(true);
  expect(await home.loggedInName()).toBe('Alex');
});