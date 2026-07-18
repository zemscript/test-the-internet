import { Locator, Page } from "@playwright/test";

class Page22 {
  readonly page: Page;
  readonly button: Locator;
  readonly latitudeText: Locator;
  readonly longitudeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.button = page.getByRole("button", { name: "Where am I?" });
    this.latitudeText = page.locator("#content #lat-value");
    this.longitudeText = page.locator("#content #long-value");
  }

  async clickButton() {
    await this.button.click();
  }
}

export default Page22;
