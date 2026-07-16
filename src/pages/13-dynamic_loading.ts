import { Locator, Page } from "@playwright/test";

class Page13 {
  readonly page: Page;
  readonly link: Locator;
  readonly text: Locator;
  readonly button: Locator;
  readonly loading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.link = page.locator(".example a");
    this.text = page.locator("#finish h4");
    this.button = page.locator("#start button");
    this.loading = page.locator(".example #loading");
  }

  async clickLink(index: number) {
    await this.link.nth(index).click();
  }

  async clickButton() {
    await this.button.click();
  }
}

export default Page13;
