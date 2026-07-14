import { Locator, Page } from "@playwright/test";

class Page6 {
  readonly page: Page;
  readonly checkbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkbox = page.locator('input[type="checkbox"]');
  }

  async clickCheckbox(index: number) {
    await this.checkbox.nth(index).click();
  }
}

export default Page6;
