import { test, expect } from "@/fixtures/base-test";
import Page10 from "@/pages/10-drag_and_drop";

test.describe("Drag and Drop", async () => {
  let testingPage: Page10;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page10(page);
    await basePage.navigate();
    await basePage.click("Drag and Drop");
  });

  test("Взаимодействие с Drag and Drop", async () => {
    await expect(testingPage.itemA).toHaveText("A");
    await expect(testingPage.itemB).toHaveText("B");
    await testingPage.clickDrag();
    await expect(testingPage.itemA).toHaveText("B");
    await expect(testingPage.itemB).toHaveText("A");
  });
});
