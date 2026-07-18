import { FrameLocator, Locator, Page } from "@playwright/test";

type FramePosition = "LEFT" | "MIDDLE" | "RIGHT" | "BOTTOM";

class Page21 {
  readonly page: Page;
  readonly link: Locator;
  readonly editorFrame: FrameLocator;
  readonly iframeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.link = page.getByRole("link");
    this.editorFrame = page.frameLocator("#mce_0_ifr");
    this.iframeText = this.editorFrame.locator("#tinymce p");
  }

  //   linkHref(name: string) {
  //     return this.link.getByText(name, { exact: true });
  //   }

  //   async clickLink(name: string) {
  //     await this.linkHref(name).click();
  //   }

  async clickLink(name: string) {
    await this.link.getByText(name, { exact: true }).click();
  }

  getFrameMap(name: FramePosition) {
    const topFrame = this.page.frameLocator('frame[name="frame-top"]');
    const frameMap: Record<string, FrameLocator> = {
      LEFT: topFrame.frameLocator('frame[name="frame-left"]'),
      MIDDLE: topFrame.frameLocator('frame[name="frame-middle"]'),
      RIGHT: topFrame.frameLocator('frame[name="frame-right"]'),
      BOTTOM: this.page.frameLocator('frame[name="frame-bottom"]'),
    };
    return frameMap[name];
  }

  getCurrentFrame(name: FramePosition) {
    return this.getFrameMap(name).locator("body");
  }
}

export default Page21;
