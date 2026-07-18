import { ENV_BASE_URL } from "@/env";
import { test, expect } from "@/fixtures/base-test";
import Page20 from "@/pages/20-form_authentication";

test.describe("Form Authentication", async () => {
  let testingPage: Page20;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page20(page);
    await basePage.navigate();
    await basePage.click("Form Authentication");
  });

  test("Успешная авторизация", async ({ page }) => {
    await Promise.all([
      expect(testingPage.inputUsername).toBeVisible(),
      expect(testingPage.inputPassword).toBeVisible(),
    ]);
    await testingPage.fillForm("tomsmith", "SuperSecretPassword!");
    await expect(testingPage.textArert).toHaveText(
      /You logged into a secure area!/,
    );
    // await expect(testingPage.textArert).toContainText(
    //   "You logged into a secure area!",
    // );
    await expect(page).toHaveURL(`${ENV_BASE_URL}/secure`);
    await testingPage.clickLogout();
    await expect(page).toHaveURL(`${ENV_BASE_URL}/login`);
  });

  test("Авторизация с неверными данными", async ({ page }) => {
    await Promise.all([
      expect(testingPage.inputUsername).toBeVisible(),
      expect(testingPage.inputPassword).toBeVisible(),
    ]);
    await testingPage.fillForm("tomsmith", "qwe");
    await expect(testingPage.textArert).toHaveText(/Your password is invalid!/);
    await expect(page).toHaveURL(`${ENV_BASE_URL}/login`);
  });

  test("Переход на страницу после авторизаци", async ({ page }) => {
    page.goto(`${ENV_BASE_URL}/secure`);
    await expect(testingPage.textArert).toHaveText(
      /You must login to view the secure area!/,
    );
    await expect(page).toHaveURL(`${ENV_BASE_URL}/login`);
  });
});
