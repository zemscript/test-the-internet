import { Locator, Page } from "@playwright/test";

class Page14 {
  readonly page: Page;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly modalClose: Locator;
  readonly reEnable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator("#modal");
    this.modalTitle = page.locator("#modal .modal h3");
    this.modalClose = page.locator("#modal .modal-footer").getByText("Close");
    this.reEnable = page.locator("#restart-ad");
  }

  async clickClose() {
    await this.modalClose.click();
  }

  async clickReEnable() {
    await this.reEnable.click();
  }
}

export default Page14;
