import { Locator, Page } from "@playwright/test";

class Page20 {
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

  //   async fillUsername(text: string) {
  //     await this.inputUsername.fill(text);
  //   }

  //   async fillPassword(text: string) {
  //     await this.inputPassword.fill(text);
  //   }

  async fillForm(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
  }

  async clickLogout() {
    await this.buttonLogout.click();
  }
}

export default Page20;
