import { Locator, Page } from "@playwright/test";

class Page1 {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h3");
  }
}

export default Page1;
