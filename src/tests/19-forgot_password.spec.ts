// import { ENV_BASE_URL } from "@/env";
import { test, expect } from "@/fixtures/base-test";
import Page19 from "@/pages/19-forgot_password";

test.describe("Forgot Password", async () => {
  let testingPage: Page19;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page19(page);
    await basePage.navigate();
    await basePage.click("Forgot Password");
  });

  test("Восстановление пароля", async ({ page }) => {
    await expect(testingPage.input).toBeVisible();
    await expect(testingPage.button).toBeVisible();
    await testingPage.inputFill("test@example.com");
    const requestPromise = page.waitForRequest(
      (request) =>
        request.url().includes("/forgot_password") &&
        request.method() === "POST",
    );
    const responsePromise = page.waitForResponse(
      (response) => response.url().includes("/forgot_password"),
      //   && response.request().method() === "POST",
    );
    await testingPage.clickButton();
    const request = await requestPromise;
    const response = await responsePromise;
    // const payloadJson = request.postDataJSON();
    expect(request.postData()).toContain("email=test%40example.com");
    expect(response.status()).toBe(500);
    // expect(payloadJson).toEqual({
    //   email: "test@example.com",
    // });
    await expect(page).toHaveURL(/.*forgot_password/);
    // await expect(page).toHaveURL(`${ENV_BASE_URL}/forgot_password`);
  });
});
