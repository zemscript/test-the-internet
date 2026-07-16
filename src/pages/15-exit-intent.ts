import { Locator, Page } from "@playwright/test";

class Page15 {
  readonly page: Page;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly modalClose: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator("#ouibounce-modal");
    this.modalTitle = page.locator("#ouibounce-modal .modal h3");
    this.modalClose = page
      .locator("#ouibounce-modal .modal-footer")
      .getByText("Close");
  }

  async clickClose() {
    await this.modalClose.click();
  }
}

export default Page15;
