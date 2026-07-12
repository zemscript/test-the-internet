import { Locator, Page } from "@playwright/test";

class Page2 {
  readonly page: Page;
  readonly addButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole("button", {
      name: "Add Element",
      exact: true,
    });
    this.deleteButton = page.getByRole("button", {
      name: "Delete",
      exact: true,
    });
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async clickDelete(index: number) {
    await this.deleteButton.nth(index).click();
  }
}

export default Page2;
