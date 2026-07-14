import { test, expect } from "@/fixtures/base-test";
import Page7 from "@/pages/7-сontext_menu";

test.describe("Context Menu", async () => {
  let testingPage: Page7;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page7(page);
    await basePage.navigate();
    await basePage.click("Context Menu");
  });

  test("Взаимодействие с контекстным меню", async ({ page }) => {
    let alertText = "";
    page.once("dialog", async (dialog) => {
      alertText = dialog.message();
      await dialog.accept();
    });
    await testingPage.inputClick();
    expect(alertText).toBe("You selected a context menu");
  });
});
