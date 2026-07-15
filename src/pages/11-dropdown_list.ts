import { Locator, Page } from "@playwright/test";

class Page11 {
  readonly page: Page;
  readonly dropdown: Locator;
  readonly value: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator("#dropdown");
    this.value = page.locator("#dropdown option:checked");
  }
}

export default Page11;
