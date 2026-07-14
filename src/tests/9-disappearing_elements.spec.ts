import { ENV_BASE_URL } from "@/env";
import { test, expect } from "@/fixtures/base-test";
import Page9 from "@/pages/9-disappearing_elements";

test.describe("Disappearing Elements", async () => {
  let testingPage: Page9;

  const linkItems = [
    {
      text: "Home",
      href: "/",
      expectedUrl: `${ENV_BASE_URL}`,
    },
    {
      text: "About",
      href: "/about/",
      expectedUrl: `${ENV_BASE_URL}/about/`,
    },
    {
      text: "Contact Us",
      href: "/contact-us/",
      expectedUrl: `${ENV_BASE_URL}/contact-us/`,
    },
    {
      text: "Portfolio",
      href: "/portfolio/",
      expectedUrl: `${ENV_BASE_URL}/portfolio/`,
    },
  ];

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page9(page);
    await basePage.navigate();
    await basePage.click("Disappearing Elements");
  });

  for (const item of linkItems) {
    test(`Проверка ссылки "${item.text}"`, async ({ page }) => {
      const locatorText = testingPage.linkText(item.text);
      await expect(locatorText).toBeVisible();
      const locatorHref = testingPage.linkHref(item.href);
      await expect(locatorHref).toBeVisible();
      await locatorText.click();
      await expect(page).toHaveURL(item.expectedUrl);
    });
  }
});
