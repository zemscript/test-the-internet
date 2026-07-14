import { Locator, Page, Response } from "@playwright/test";

class Page8 {
  readonly page: Page;
  readonly text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.text = page.locator("h3");
  }

  async apply(): Promise<Response | null> {
    return await this.page.goto(
      "https://admin:admin@the-internet.herokuapp.com/digest_auth",
    );
  }

  async cancel(): Promise<Response | null> {
    this.page.once("dialog", async (dialog) => {
      await dialog.dismiss();
    });
    return await this.page.goto("/digest_auth");
  }
}

export default Page8;
