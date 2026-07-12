import { test, expect } from "@/fixtures/base-test";
import Page1 from "@/pages/1-a-b_testing";

test.describe("A/B Testing", async () => {
  let testingPage: Page1;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page1(page);
    await basePage.navigate();
    await basePage.click("A/B Testing");
  });

  test("Проверка распределения в A/B тестировании", async () => {
    await expect(testingPage.title).toBeVisible();
    await expect(testingPage.title).toContainText(
      /A\/B Test (Variation 1|Control)/,
    );
  });
});
