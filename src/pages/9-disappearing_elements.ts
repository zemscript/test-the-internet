import { Locator, Page } from "@playwright/test";

class Page9 {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  linkText(text: string): Locator {
    return this.page.getByRole("link", { name: text, exact: true });
  }

  linkHref(href: string): Locator {
    return this.page.locator(`a[href="${href}"]`);
  }

  async clickLinkByText(text: string) {
    await this.linkText(text).click();
  }

  async clickLinkHref(href: string) {
    await this.linkHref(href).click();
  }
}

export default Page9;
