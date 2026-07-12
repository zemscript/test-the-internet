import { test, expect } from "@/fixtures/base-test";
import Page2 from "@/pages/2-add-remove_elements";

test.describe("Add/Remove Elements", async () => {
  let testingPage: Page2;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page2(page);
    await basePage.navigate();
    await basePage.click("Add/Remove Elements");
  });

  test("Динамическое добавление и удаление элементов", async () => {
    await expect(testingPage.addButton).toBeVisible();
    for (let i = 0; i < 3; i++) {
      await testingPage.clickAdd();
    }
    await expect(testingPage.deleteButton).toHaveCount(3);
    await testingPage.clickDelete(1);
    await expect(testingPage.deleteButton).toHaveCount(2);
    while ((await testingPage.deleteButton.count()) > 0) {
      await testingPage.clickDelete(0);
    }
    await expect(testingPage.deleteButton).toHaveCount(0);
  });
});
