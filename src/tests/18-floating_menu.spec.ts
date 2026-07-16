import { ENV_BASE_URL } from "@/env";
import { test, expect } from "@/fixtures/base-test";
import Page18 from "@/pages/18-floating_menu";
import { log } from "console";

test.describe("Floating Menu", async () => {
  let testingPage: Page18;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page18(page);
    await basePage.navigate();
    await basePage.click("Floating Menu");
  });

  test("Проверка плавающего меню", async ({ page }) => {
    await expect(testingPage.menu).toBeVisible();
    // await expect(testingPage.menu).toHaveCSS("position", "absolute");
    const menuStyles = await testingPage.menu.evaluate((item) => {
      const styles = window.getComputedStyle(item);
      return {
        zIndex: styles.zIndex,
        position: styles.position,
        left: styles.left,
      };
    });
    expect(menuStyles.zIndex).toBe("100");
    expect(menuStyles.position).toBe("absolute");
    expect(menuStyles.left).toMatch(/^\d+px$/);
    log("left у плавающего меню: " + menuStyles.left);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(testingPage.menu).toBeInViewport();
    await testingPage.clickLink("Home");
    await expect(page).toHaveURL(`${ENV_BASE_URL}/floating_menu#home`);
  });
});
