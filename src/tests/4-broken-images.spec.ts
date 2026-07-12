import { test, expect } from "@/fixtures/base-test";
import Page4 from "@/pages/4-broken-images";
import { Locator } from "@playwright/test";

test.describe("Broken Images", async () => {
  let testingPage: Page4;
  let images: Locator[];

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page4(page);
    await basePage.navigate();
    await basePage.click("Broken Images");
    await expect(testingPage.image).toHaveCount(3);
    images = await testingPage.image.all();
  });

  test("Поиск и валидация", async ({ page }) => {
    for (const item of images) {
      const src = await item.getAttribute("src");
      expect(src).toBeTruthy();
      const srcURL = new URL(src!, page.url()).href;
      const response = await page.request.get(srcURL);
      expect([200, 404]).toContain(response.status());
    }
  });

  test("Битые изображения", async ({ page }) => {
    let brokenImagesCount = 0;
    for (const item of images) {
      const src = await item.getAttribute("src");
      expect(src).toBeTruthy();
      const srcURL = new URL(src!, page.url()).href;
      const response = await page.request.get(srcURL);
      if (response.status() == 404) {
        brokenImagesCount++;
      }
    }
    expect(brokenImagesCount).toBe(2);
  });
});
