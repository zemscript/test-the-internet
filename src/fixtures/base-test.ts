import Page0 from "@/pages/0-base";
import { test as base } from "@playwright/test";
export { expect } from "@playwright/test";

interface FixturesProps {
  basePage: Page0;
}

export const test = base.extend<FixturesProps>({
  basePage: async ({ page }, use) => {
    const basePage = new Page0(page);
    await use(basePage);
  },

  page: async ({ page }, use) => {
    await use(page);
    await page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
  },
});
