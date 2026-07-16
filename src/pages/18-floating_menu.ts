import { Locator, Page } from "@playwright/test";

class Page18 {
  readonly page: Page;
  readonly menu: Locator;
  readonly link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu = page.locator("#menu");
    this.link = page.locator("#menu a");
  }

  linkHref(name: string): Locator {
    return this.link.getByText(name, { exact: true });
  }

  async clickLink(name: string) {
    await this.linkHref(name).click();
  }
}

export default Page18;
