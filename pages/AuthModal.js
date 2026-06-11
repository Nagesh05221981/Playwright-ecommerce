// pages/AuthModal.js
import { BasePage } from './BasePage.js';

export class AuthModal extends BasePage {
  constructor(page) {
    super(page);

    this.root = page.locator('#auth-modal');

    // Tabs
    this.loginTab  = page.locator('#tab-login');
    this.signupTab = page.locator('#tab-signup');

    // Login form
    this.loginForm     = page.locator('#form-login');
    this.loginEmail    = page.locator('#l-email');
    this.loginPassword = page.locator('#l-pass');
    this.loginSubmit   = this.loginForm.getByRole('button', { name: 'Sign In' });
    this.loginMessage  = page.locator('#l-msg');

    // Signup form
    this.signupForm     = page.locator('#form-signup');
    this.signupName     = page.locator('#s-name');
    this.signupEmail    = page.locator('#s-email');
    this.signupPassword = page.locator('#s-pass');
    this.signupSubmit   = this.signupForm.getByRole('button', { name: 'Create Account' });
    this.signupMessage  = page.locator('#s-msg');
  }

  async waitForOpen()   { await this.expectVisible(this.root); }
  async waitForClosed() { await this.expectHidden(this.root); }

  async switchToLogin() {
    await this.click(this.loginTab);
    await this.expectVisible(this.loginForm);
  }

  async switchToSignup() {
    await this.click(this.signupTab);
    await this.expectVisible(this.signupForm);
  }

  async signUp(user) {
    await this.switchToSignup();
    await this.fill(this.signupName,     user.name);
    await this.fill(this.signupEmail,    user.email);
    await this.fill(this.signupPassword, user.password);
    await this.click(this.signupSubmit);
  }

  async login(user) {
    await this.switchToLogin();
    await this.fill(this.loginEmail,    user.email);
    await this.fill(this.loginPassword, user.password);
    await this.click(this.loginSubmit);
  }

  async signupMessageText() { return this.getText(this.signupMessage); }
  async loginMessageText()  { return this.getText(this.loginMessage); }
}