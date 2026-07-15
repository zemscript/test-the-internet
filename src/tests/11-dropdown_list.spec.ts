import { test, expect } from "@/fixtures/base-test";
import Page11 from "@/pages/11-dropdown_list";

test.describe("Dropdown List", async () => {
  let testingPage: Page11;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page11(page);
    await basePage.navigate();
    await basePage.click("Dropdown");
  });

  test("Взаимодействие с Dropdown List", async () => {
    await expect(testingPage.dropdown).toBeVisible();
    await expect(testingPage.value).toHaveText("Please select an option");
    await testingPage.dropdown.selectOption({ value: "1" });
    await expect(testingPage.value).toHaveText("Option 1");
    await testingPage.dropdown.selectOption({ label: "Option 2" });
    await expect(testingPage.dropdown).toHaveValue("2");
  });
});
