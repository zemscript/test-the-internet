import { test, expect } from "@/fixtures/base-test";
import Page6 from "@/pages/6-checkboxes";

test.describe("Checkboxes", async () => {
  let testingPage: Page6;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page6(page);
    await basePage.navigate();
    await basePage.click("Checkboxes");
  });

  test("Взаимодействие с чекбоксами", async () => {
    await expect(testingPage.checkbox).toHaveCount(2);
    await expect(testingPage.checkbox.nth(0)).not.toBeChecked();
    await expect(testingPage.checkbox.nth(1)).toBeChecked();
    await testingPage.clickCheckbox(0);
    await testingPage.clickCheckbox(1);
    await expect(testingPage.checkbox.nth(0)).toBeChecked();
    await expect(testingPage.checkbox.nth(1)).not.toBeChecked();
  });
});
