import { Locator, Page } from "@playwright/test";

class Page5 {
  readonly page: Page;
  readonly buttonBlue: Locator;
  readonly buttonRed: Locator;
  readonly buttonGreen: Locator;
  readonly tableValue: Locator;
  readonly canvasValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonBlue = page.locator(".button:not(.alert):not(.success)");
    this.buttonRed = page.locator(".button.alert");
    this.buttonGreen = page.locator(".button.success");
    this.tableValue = page.locator("table tbody tr:first-child td");
    this.canvasValue = page.locator("#canvas");
  }

  async clickBlue() {
    await this.buttonBlue.click();
  }

  async getCanvas(): Promise<string> {
    return await this.canvasValue.evaluate((value) => {
      if (value instanceof HTMLCanvasElement) {
        return value.toDataURL();
      }
      throw new Error("Элемент не является Canvas");
    });
  }
}

export default Page5;
