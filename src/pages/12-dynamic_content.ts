import { Locator, Page } from "@playwright/test";

class Page12 {
  readonly page: Page;
  readonly itemImg: Locator;
  readonly itemText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemImg = page.locator("#content.large-centered .row > .large-2 img");
    this.itemText = page.locator(
      "#content.large-centered .row > div.large-10.columns",
    );
  }
}

export default Page12;
