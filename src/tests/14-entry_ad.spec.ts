import { test, expect } from "@/fixtures/base-test";
import Page14 from "@/pages/14-entry_ad";

test.describe("Entry Ad", async () => {
  let testingPage: Page14;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page14(page);
    await basePage.navigate();
    await basePage.click("Entry Ad");
  });

  test("Проверка всплывающего окна", async ({ page }) => {
    await expect(testingPage.modal).toBeVisible();
    await expect(testingPage.modalTitle).toHaveText("This is a modal window");
    await testingPage.clickClose();
    await expect(testingPage.modal).not.toBeVisible();
    await page.reload();
    await expect(testingPage.modal).not.toBeVisible();
    await testingPage.clickReEnable();
    await page.reload();
    await expect(testingPage.modal).toBeVisible();
  });
});
