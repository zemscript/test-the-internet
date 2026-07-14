import { test, expect } from "@/fixtures/base-test";
import Page5 from "@/pages/5-challenging_dom";
import { log } from "console";

test.describe("Challenging DOM", async () => {
  let testingPage: Page5;

  test.beforeEach(async ({ basePage, page }) => {
    testingPage = new Page5(page);
    await basePage.navigate();
    await basePage.click("Challenging DOM");
  });

  test("Проверка данных таблицы", async () => {
    const valueRowBefore = await testingPage.tableValue.allTextContents();
    log("Таблица до: " + valueRowBefore.slice(0, -2));
    await testingPage.clickBlue();
    await expect(testingPage.tableValue.first()).toHaveText(valueRowBefore[0]);
    const valueRowAfter = await testingPage.tableValue.allTextContents();
    log("Таблица после: " + valueRowAfter.slice(0, -2));
    expect(valueRowBefore).toEqual(valueRowAfter);
  });

  test("Проверка текста кнопок", async () => {
    const valueBlueBefore = await testingPage.buttonBlue.innerText();
    log("Текст до: " + valueBlueBefore);
    await testingPage.clickBlue();
    let valueBlueAfter = await testingPage.buttonBlue.innerText();
    while (valueBlueBefore == valueBlueAfter) {
      log("Текст совпал");
      await testingPage.clickBlue();
      valueBlueAfter = await testingPage.buttonBlue.innerText();
    }
    log("Текст после: " + valueBlueAfter);
    expect(valueBlueBefore).not.toEqual(valueBlueAfter);
  });

  test("Проверка перерисовки Canvas", async () => {
    const valueCanvasBefore = await testingPage.getCanvas();
    await testingPage.clickBlue();
    const valueCanvasAfter = await testingPage.getCanvas();
    expect(valueCanvasBefore).not.toEqual(valueCanvasAfter);
  });
});
