import { test, expect } from "@/fixtures/base-test";
import Page22 from "@/pages/22-geolocation";

test.describe("Geolocation", async () => {
  let testingPage: Page22;

  test.beforeEach(async ({ basePage, page, context }) => {
    testingPage = new Page22(page);
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ latitude: 48.8566, longitude: 2.3522 });
    await basePage.navigate();
    await basePage.click("Geolocation");
  });

  test("Проверка работы геолокации", async ({ page }) => {
    await expect(testingPage.button).toBeVisible();
    await testingPage.clickButton();
    await page.waitForTimeout(500);
    await expect(testingPage.latitudeText).toHaveText(/48\.8566/);
    await expect(testingPage.longitudeText).toHaveText(/2\.3522/);
  });
});
