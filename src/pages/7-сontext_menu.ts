import { Locator, Page } from "@playwright/test";

class Page7 {
  readonly page: Page;
  readonly input: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator("#hot-spot");
  }

  async inputClick() {
    await this.input.click({ button: "right" });
  }
}

export default Page7;
