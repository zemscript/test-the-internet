import { FrameLocator, Locator, Page, Response } from "@playwright/test";
import path from "path";

type FramePosition = "LEFT" | "MIDDLE" | "RIGHT" | "BOTTOM";
type InputDirection = "ArrowUp" | "ArrowDown";
type ConfirmOptions = "accept" | "dismiss";

export class Page0 {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("a");
  }

  async navigate() {
    await this.page.goto("/");
  }

  async click(text: string) {
    await this.page.getByRole("link", { name: text, exact: true }).click();
  }
}

export class Page1 {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h3");
  }
}

export class Page2 {
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

export class Page3 {
  readonly page: Page;
  readonly text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.text = page.locator("body");
  }

  async apply() {
    await this.page.goto(
      "https://admin:admin@the-internet.herokuapp.com/basic_auth",
    );
  }

  async cancel() {
    this.page.once("dialog", async (dialog) => {
      await dialog.dismiss();
    });
    await this.page.goto("/basic_auth");
  }
}

export class Page4 {
  readonly page: Page;
  readonly image: Locator;

  constructor(page: Page) {
    this.page = page;
    this.image = page.locator(".example img");
  }
}

export class Page5 {
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

export class Page6 {
  readonly page: Page;
  readonly checkbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkbox = page.locator('input[type="checkbox"]');
  }

  async clickCheckbox(index: number) {
    await this.checkbox.nth(index).click();
  }
}

export class Page7 {
  readonly page: Page;
  readonly input: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator("#hot-spot");
  }

  async inputClick() {
    await this.input.click({ button: "right" });
  }
}

export class Page8 {
  readonly page: Page;
  readonly text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.text = page.locator("h3");
  }

  async apply(): Promise<Response | null> {
    return await this.page.goto(
      "https://admin:admin@the-internet.herokuapp.com/digest_auth",
    );
  }

  async cancel(): Promise<Response | null> {
    this.page.once("dialog", async (dialog) => {
      await dialog.dismiss();
    });
    return await this.page.goto("/digest_auth");
  }
}

export class Page9 {
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

export class Page10 {
  readonly page: Page;
  readonly itemA: Locator;
  readonly itemB: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemA = page.locator("#column-a");
    this.itemB = page.locator("#column-b");
  }

  async clickDrag() {
    await this.itemA.dragTo(this.itemB);
  }
}

export class Page11 {
  readonly page: Page;
  readonly dropdown: Locator;
  readonly value: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator("#dropdown");
    this.value = page.locator("#dropdown option:checked");
  }
}

export class Page12 {
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

export class Page13 {
  readonly page: Page;
  readonly link: Locator;
  readonly text: Locator;
  readonly button: Locator;
  readonly loading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.link = page.locator(".example a");
    this.text = page.locator("#finish h4");
    this.button = page.locator("#start button");
    this.loading = page.locator(".example #loading");
  }

  async clickLink(index: number) {
    await this.link.nth(index).click();
  }

  async clickButton() {
    await this.button.click();
  }
}

export class Page14 {
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

export class Page15 {
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

export class Page16 {
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

export class Page17 {
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

export class Page18 {
  readonly page: Page;
  readonly menu: Locator;
  readonly link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu = page.locator("#menu");
    this.link = page.locator("#menu a");
  }

  async clickLink(name: string) {
    await this.link.getByText(name, { exact: true }).click();
  }
}

export class Page19 {
  readonly page: Page;
  readonly input: Locator;
  readonly button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator("input#email");
    this.button = page.locator("button#form_submit");
  }

  async inputFill(text: string) {
    await this.input.fill(text);
  }

  async clickButton() {
    await this.button.click();
  }
}

export class Page20 {
  readonly page: Page;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;
  readonly buttonLogout: Locator;
  readonly textArert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.locator("input#username");
    this.inputPassword = page.getByLabel("Password");
    this.buttonLogin = page.getByRole("button", { name: "Login" });
    this.buttonLogout = page.getByRole("link", { name: "Logout" });
    this.textArert = page.locator("#flash");
    // this.inputPassword = page.locator("input#password");
    // this.buttonLogin = page.locator('button[type="submit"]');
  }

  async fillForm(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
  }

  async clickLogout() {
    await this.buttonLogout.click();
  }
}

export class Page21 {
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

export class Page22 {
  readonly page: Page;
  readonly button: Locator;
  readonly latitudeText: Locator;
  readonly longitudeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.button = page.getByRole("button", { name: "Where am I?" });
    this.latitudeText = page.locator("#content #lat-value");
    this.longitudeText = page.locator("#content #long-value");
  }

  async clickButton() {
    await this.button.click();
  }
}

export class Page23 {
  readonly page: Page;
  readonly input: Locator;
  readonly num: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator('input[type="range"]');
    this.num = page.locator("#range");
  }

  // async moveRight() {
  //   await this.input.press("ArrowRight");
  // }

  async moveInput(step: number) {
    await this.input.focus();
    for (let i = 0; i < step; i++) {
      await this.input.press("ArrowRight");
    }
  }
}

export class Page24 {
  readonly page: Page;
  readonly card: Locator;
  readonly text: Locator;
  readonly link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.card = page.locator("div.figure");
    this.text = page.locator(".figcaption h5");
    this.link = page.getByRole("link", { name: "View profile" });
  }

  async cardHover(index: number) {
    await this.card.nth(index).hover();
  }

  cardText(index: number) {
    return this.text.nth(index);
  }

  async cardLink(index: number) {
    return this.link.nth(index).click();
  }
}

export class Page25 {
  readonly page: Page;
  readonly paragraph: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paragraph = page.locator("div.jscroll-added");
  }
}

export class Page26 {
  readonly page: Page;
  readonly input: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator('input[type="number"]');
  }

  async moveInput(direction: InputDirection, step: number) {
    await this.input.focus();
    for (let i = 0; i < step; i++) {
      await this.input.press(direction);
    }
  }
}

export class Page27 {
  readonly page: Page;
  readonly enabledItem: Locator;
  readonly downloadsItem: Locator;
  readonly pdfItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.enabledItem = page.getByRole("menuitem", { name: "Enabled" });
    this.downloadsItem = page.getByRole("menuitem", { name: "Downloads" });
    this.pdfItem = page.getByRole("menuitem", { name: "PDF" });
  }

  async hoverEnabled() {
    await this.enabledItem.hover();
  }

  async hoverDownloads() {
    await this.downloadsItem.hover();
  }
}

export class Page28 {
  readonly page: Page;
  readonly buttonAlert: Locator;
  readonly buttonConfirm: Locator;
  readonly buttonPrompt: Locator;
  readonly text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonAlert = page.getByRole("button", { name: "Click for JS Alert" });
    this.buttonConfirm = page.getByRole("button", {
      name: "Click for JS Confirm",
    });
    this.buttonPrompt = page.getByRole("button", {
      name: "Click for JS Prompt",
    });
    this.text = page.locator("#result");
  }

  async alertClick() {
    let alertText = "";
    this.page.once("dialog", async (dialog) => {
      alertText = dialog.message();
      await dialog.accept();
    });
    await this.buttonAlert.click();
    return alertText;
  }

  async confirmClick(action: ConfirmOptions) {
    let alertText = "";
    this.page.once("dialog", async (dialog) => {
      alertText = dialog.message();
      if (action === "accept") {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    await this.buttonConfirm.click();
    return alertText;
  }

  async promptClick(action: ConfirmOptions, text?: string) {
    let alertText = "";
    this.page.once("dialog", async (dialog) => {
      alertText = dialog.message();
      if (action === "accept") {
        await dialog.accept(text);
      } else {
        await dialog.dismiss();
      }
    });
    await this.buttonPrompt.click();
    return alertText;
  }
}

export class Page29 {
  readonly page: Page;
  readonly text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.text = page.locator("p");
  }
}

export class Page30 {
  readonly page: Page;
  readonly text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.text = page.locator("#result");
  }
}
