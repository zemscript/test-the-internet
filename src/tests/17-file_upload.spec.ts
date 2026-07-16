import { test, expect } from "@/fixtures/base-test";
import Page17 from "@/pages/17-file_upload";

test.describe("File Upload", async () => {
  let testingPage: Page17;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page17(page);
    await basePage.navigate();
    await basePage.click("File Upload");
  });

  test("Проверка загрузки файлов", async () => {
    await expect(testingPage.input).toBeVisible();
    await testingPage.loadFile();
    await expect(testingPage.text).toHaveText("test_upload.txt");
  });
});
