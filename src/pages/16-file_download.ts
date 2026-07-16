import { Locator, Page } from "@playwright/test";

class Page16 {
  readonly page: Page;
  readonly file: Locator;

  constructor(page: Page) {
    this.page = page;
    this.file = page.locator(".example a");
  }

  fileHref(name: string): Locator {
    return this.file.getByText(name, { exact: true });
    // return this.page.locator(".example a").getByText(name, { exact: true });
  }

  async clickFile(name: string) {
    await this.fileHref(name).click();
  }
}

export default Page16;
