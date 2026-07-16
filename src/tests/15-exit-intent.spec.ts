import { test, expect } from "@/fixtures/base-test";
import Page15 from "@/pages/15-exit-intent";

test.describe("Exit Intent", async () => {
  let testingPage: Page15;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page15(page);
    await basePage.navigate();
    await basePage.click("Exit Intent");
  });

  test("Проверка всплывающего окна при уходе со страницы", async ({ page }) => {
    await expect(testingPage.modal).not.toBeVisible();
    await page.mouse.move(100, 100);
    await page.mouse.move(100, -10);
    await expect(testingPage.modal).toBeVisible();
    await expect(testingPage.modalTitle).toHaveText("This is a modal window");
    await testingPage.clickClose();
    await expect(testingPage.modal).not.toBeVisible();
  });
});
