import { Locator, Page } from "@playwright/test";

class Page0 {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("a");
  }

  async navigate() {
    await this.page.goto("/");
  }

  async click(text: string) {
    await this.page.getByRole("link", { name: text, exact: true }).click();
  }
}

export default Page0;
