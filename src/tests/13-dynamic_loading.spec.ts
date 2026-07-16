import { test, expect } from "@/fixtures/base-test";
import Page13 from "@/pages/13-dynamic_loading";
import { ENV_BASE_URL } from "@/env";

test.describe("Dynamic Loading", async () => {
  let testingPage: Page13;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page13(page);
    await basePage.navigate();
    await basePage.click("Dynamic Loading");
    await expect(testingPage.link).toHaveCount(2);
  });

  const itemsTests = [
    {
      title: "Элемент скрыт",
      index: 0,
      text: "Example 1: Element on page that is hidden",
      url: `${ENV_BASE_URL}/dynamic_loading/1`,
      init: "hidden",
    },
    {
      title: "Элемент создается динамически",
      index: 1,
      text: "Example 2: Element rendered after the fact",
      url: `${ENV_BASE_URL}/dynamic_loading/2`,
      init: "detached",
    },
  ];

  for (const { title, index, text, url, init } of itemsTests) {
    test(title, async ({ page }) => {
      await expect(testingPage.link.nth(index)).toHaveText(text);
      await testingPage.clickLink(index);
      await expect(page).toHaveURL(url);
      if (init === "hidden") {
        await expect(testingPage.text).not.toBeVisible();
      } else {
        await expect(testingPage.text).not.toBeAttached();
      }
      await testingPage.clickButton();
      await expect(testingPage.loading).toBeVisible();
      await expect(testingPage.text).toBeVisible();
      await expect(testingPage.loading).not.toBeVisible();
      await expect(testingPage.text).toHaveText("Hello World!");
    });
  }
});
