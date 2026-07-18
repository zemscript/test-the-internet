import { App } from "@/pages/app";
import { test as base } from "@playwright/test";
export { expect } from "@playwright/test";

interface FixturesProps {
  app: App;
}

export const test = base.extend<FixturesProps>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },

  page: async ({ page }, use) => {
    await use(page);
    await page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
  },
});
