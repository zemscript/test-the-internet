import { Locator, Page } from "@playwright/test";

class Page4 {
  readonly page: Page;
  readonly image: Locator;

  constructor(page: Page) {
    this.page = page;
    this.image = page.locator(".example img");
  }
}

export default Page4;
