import { test, expect } from "@/fixtures/base-test";
import Page21 from "@/pages/21-frames";

test.describe("Frames", async () => {
  let testingPage: Page21;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page21(page);
    await basePage.navigate();
    await basePage.click("Frames");
  });

  test("Работа с Frame", async () => {
    await testingPage.clickLink("Nested Frames");
    await expect(testingPage.getCurrentFrame("LEFT")).toHaveText(/LEFT/);
    await expect(testingPage.getCurrentFrame("MIDDLE")).toHaveText(/MIDDLE/);
    await expect(testingPage.getCurrentFrame("RIGHT")).toHaveText(/RIGHT/);
    await expect(testingPage.getCurrentFrame("BOTTOM")).toHaveText(/BOTTOM/);
  });

  test("Работа с iFrame", async () => {
    await testingPage.clickLink("iFrame");
    await expect(testingPage.iframeText).toHaveText(/Your content goes here./);
  });
});
