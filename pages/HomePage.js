// pages/HomePage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * HomePage — the NOVA store landing page (index.html).
 */
export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    // Nav
    this.logo         = page.locator('.nav-logo');
    this.searchInput  = page.locator('#search-input');
    this.loginBtn     = page.getByRole('button', { name: 'Login' });
    this.signupBtn    = page.getByRole('button', { name: 'Sign Up' });
    this.userChip     = page.locator('#user-chip');
    this.userName     = page.locator('#uname-label');
    this.logoutBtn    = this.userChip.getByRole('button', { name: 'Out' });
    this.cartPill     = page.locator('.cart-pill');
    this.cartCount    = page.locator('#cart-count');
    this.checkoutBtn  = page.locator('.checkout-btn');

    // Cart Drawer
    this.drawer       = page.locator('#drawer');
    this.drawerItems  = this.drawer.locator('.ci');
    this.cartTotal    = page.locator('#cart-total');

    // Hero
    this.heroHeading  = page.locator('.hero h1');

    // Catalogue
    this.filterChips  = page.locator('.fchip');
    this.productCards = page.locator('.pcard');
    this.resultsInfo  = page.locator('#results-info');
  }

  async open() {
    await this.goto('/');
    await this.expectVisible(this.heroHeading);
  }

  async openLogin() {
    await this.click(this.loginBtn);
  }

  async openSignup() {
    await this.click(this.signupBtn);
  }

  async logout() {
    await this.click(this.logoutBtn);
  }

  async isLoggedIn() {
    return this.userChip.isVisible();
  }

  async loggedInName() {
    return this.getText(this.userName);
  }

  async search(term) {
    await this.fill(this.searchInput, term);
  }

  async filterBy(category) {
    const chip = this.filterChips.filter({ hasText: category });
    await this.click(chip);
  }

  async addToCart(productName) {
    const card = this.productCards.filter({ hasText: productName });
    await this.click(card.locator('.add-btn'));
  }

  async cartBadgeCount() {
    return Number(await this.getText(this.cartCount));
  }

  async openCart() {
    await this.click(this.cartPill);
  }

  async goToCheckout() {
    await this.openCart();
    await this.click(this.checkoutBtn);
  }

  drawerItem(productName) {
    return this.drawerItems.filter({ hasText: productName });
  }

  async drawerItemCount() {
    return this.drawerItems.count();
  }

  async drawerItemQty(productName) {
    return this.getText(this.drawerItem(productName).locator('.qval'));
  }

  async drawerItemSubtotal(productName) {
    return this.getText(this.drawerItem(productName).locator('.ci-sub'));
  }

  async drawerTotalAmount() {
    return this.getText(this.cartTotal);
  }
}