import { test, expect } from "@/fixtures/base-test";
import Page12 from "@/pages/12-dynamic_content";

test.describe("Dynamic Content", async () => {
  let testingPage: Page12;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page12(page);
    await basePage.navigate();
    await basePage.click("Dynamic Content");
    await expect(testingPage.itemImg).toHaveCount(3);
    await expect(testingPage.itemText).toHaveCount(3);
  });

  test("Проверка динамичности контента", async ({ page }) => {
    let initImages: (string | null)[];
    let initTexts: string[];
    let newImages: (string | null)[] = [];
    let newTexts: string[];

    const src = await testingPage.itemImg.all();
    initImages = await Promise.all(src.map((item) => item.getAttribute("src")));
    initTexts = await testingPage.itemText.allInnerTexts();
    await page.reload();
    const allImage = await testingPage.itemImg.all();
    for (const item of allImage) {
      const src = await item.getAttribute("src");
      newImages.push(src);
    }
    newTexts = await testingPage.itemText.allInnerTexts();
    expect(newTexts).not.toEqual(initTexts);
    expect(newImages).not.toEqual(initImages);
  });

  test("Проверка статичности контента", async ({ page }) => {
    let initImages: (string | null)[];
    let initTexts: string[];
    let newImages: (string | null)[] = [];
    let newTexts: string[];

    await page.goto(
      "https://the-internet.herokuapp.com/dynamic_content?with_content=static",
    );

    const src = await testingPage.itemImg.all();
    initImages = await Promise.all(src.map((item) => item.getAttribute("src")));
    initTexts = await testingPage.itemText.allInnerTexts();
    await page.reload();
    const allImage = await testingPage.itemImg.all();
    for (const item of allImage) {
      const src = await item.getAttribute("src");
      newImages.push(src);
    }
    newTexts = await testingPage.itemText.allInnerTexts();
    for (let i = 0; i < initTexts.length; i++) {
      if (i < initTexts.length - 1) {
        expect(initImages[i]).toEqual(newImages[i]);
        expect(initTexts[i]).toEqual(newTexts[i]);
      } else {
        expect(initImages[i]).not.toEqual(newImages[i]);
        expect(initTexts[i]).not.toEqual(newTexts[i]);
      }
    }
  });
});
