import { Locator, Page } from "@playwright/test";

class Page3 {
  readonly page: Page;
  readonly text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.text = page.locator("body");
  }

  async apply() {
    await this.page.goto(
      "https://admin:admin@the-internet.herokuapp.com/basic_auth",
    );
  }

  async cancel() {
    this.page.once("dialog", async (dialog) => {
      await dialog.dismiss();
    });
    await this.page.goto("/basic_auth");
  }
}

export default Page3;
