import { Locator, Page } from "@playwright/test";

class Page10 {
  readonly page: Page;
  readonly itemA: Locator;
  readonly itemB: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemA = page.locator("#column-a");
    this.itemB = page.locator("#column-b");
  }

  async clickDrag() {
    await this.itemA.dragTo(this.itemB);
  }
}

export default Page10;
