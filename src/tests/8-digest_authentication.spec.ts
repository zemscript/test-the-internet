import { test, expect } from "@/fixtures/base-test";
import Page8 from "@/pages/8-digest_authentication";

test.describe("Digest Authentication", async () => {
  let testingPage: Page8;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page8(page);
    await basePage.navigate();
    await basePage.click("Digest Authentication");
  });

  test("Успешная авторизация", async () => {
    const response = await testingPage.apply();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);
    await expect(testingPage.text).toContainText("Digest Auth");
  });

  test("Отказ от авторизации", async () => {
    const response = await testingPage.cancel();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(401);
  });
});
