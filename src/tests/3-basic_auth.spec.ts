import { test, expect } from "@/fixtures/base-test";
import Page3 from "@/pages/3-basic_auth";

test.describe("Basic Auth", async () => {
  let testingPage: Page3;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page3(page);
    await basePage.navigate();
    await basePage.click("Basic Auth");
  });

  test("Успешная авторизация", async () => {
    await testingPage.apply();
    await expect(testingPage.text).toContainText(
      "Congratulations! You must have the proper credentials.",
    );
  });

  test("Отказ от авторизации", async () => {
    await testingPage.cancel();
    await expect(testingPage.text).toContainText("Not authorized");
  });
});
