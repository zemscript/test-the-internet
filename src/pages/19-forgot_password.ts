import { Locator, Page } from "@playwright/test";

class Page19 {
  readonly page: Page;
  readonly input: Locator;
  readonly button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator("input#email");
    this.button = page.locator("button#form_submit");
  }

  async inputFill(text: string) {
    await this.input.fill(text);
  }

  async clickButton() {
    await this.button.click();
  }
}

export default Page19;
