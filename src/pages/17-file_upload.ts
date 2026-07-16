import { Locator, Page } from "@playwright/test";
import path from "path";

class Page17 {
  readonly page: Page;
  readonly input: Locator;
  readonly upload: Locator;
  readonly text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator("#file-upload");
    this.upload = page.locator("#file-submit");
    this.text = page.locator("#uploaded-files");
  }

  async loadFile() {
    const fileName = "test_upload.txt";
    const savePath = path.join(process.cwd(), "src", "download", fileName);

    await this.input.setInputFiles(savePath);
    await this.upload.click();
  }
}

export default Page17;
