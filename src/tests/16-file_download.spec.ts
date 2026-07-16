import { test, expect } from "@/fixtures/base-test";
import Page16 from "@/pages/16-file_download";
import fs from "fs";
import path from "path";

test.describe("File Download", async () => {
  let testingPage: Page16;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page16(page);
    await basePage.navigate();
    await basePage.click("File Download");
  });

  test("Проверка скачивания файлов", async ({ page }) => {
    const fileName = "test_upload.txt";
    const savePath = path.join(process.cwd(), "src", "download", fileName);

    await expect(testingPage.fileHref(fileName)).toBeVisible();
    const downloadPromise = page.waitForEvent("download");
    await testingPage.clickFile(fileName);
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(fileName);
    await download.saveAs(savePath);
    const fileExists = fs.existsSync(savePath);
    expect(fileExists).toBe(true);
    const fileStats = fs.statSync(savePath);
    expect(fileStats.size).toBeGreaterThan(0);
  });
});
