export class NavBar {
    constructor(page) {
        this.logo = page.locator('.nav-logo');
        this.searchInput = page.locator('nav input[placeholder="Search"]');
        this.cartLink = page.locator('a.nav-link', { hasText: 'Cart' });
        this.checkoutLink = page.locator('a.nav-link', { hasText: 'Checkout' });
  }
    async search(productName) {
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
  }

}
