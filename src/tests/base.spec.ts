import { ENV_BASE_URL } from "@/env";
import { test, expect } from "@/fixtures/base-test";
import { Locator } from "@playwright/test";
import { log } from "console";
import { join } from "path";
import { existsSync, statSync } from "fs";

test.describe("1. A/B Testing", () => {
  test("1.1 Проверка распределения в A/B тестировании", async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("A/B Testing");

    await expect(app.page1.title).toBeVisible();
    await expect(app.page1.title).toContainText(
      /A\/B Test (Variation 1|Control)/,
    );
  });
});

test.describe("2. Add/Remove Elements", async () => {
  test("2.1 Динамическое добавление и удаление элементов", async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Add/Remove Elements");

    await expect(app.page2.addButton).toBeVisible();
    for (let i = 0; i < 3; i++) {
      await app.page2.clickAdd();
    }
    await expect(app.page2.deleteButton).toHaveCount(3);
    await app.page2.clickDelete(1);
    await expect(app.page2.deleteButton).toHaveCount(2);
    while ((await app.page2.deleteButton.count()) > 0) {
      await app.page2.clickDelete(0);
    }
    await expect(app.page2.deleteButton).toHaveCount(0);
  });
});

test.describe("3. Basic Auth", async () => {
  test("3.1 Успешная авторизация", async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Basic Auth");

    await app.page3.apply();
    await expect(app.page3.text).toContainText(
      "Congratulations! You must have the proper credentials.",
    );
  });

  test("3.2 Отказ от авторизации", async ({ app }) => {
    await app.page3.cancel();
    await expect(app.page3.text).toContainText("Not authorized");
  });
});

test.describe("4. Broken Images", () => {
  let images: Locator[];

  test.beforeEach(async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Broken Images");
    await expect(app.page4.image).toHaveCount(3);
    images = await app.page4.image.all();
  });

  test("4.1 Поиск и валидация", async ({ page }) => {
    for (const item of images) {
      const src = await item.getAttribute("src");
      expect(src).toBeTruthy();
      const srcURL = new URL(src!, page.url()).href;
      const response = await page.request.get(srcURL);
      expect([200, 404]).toContain(response.status());
    }
  });

  test("4.2 Битые изображения", async ({ page }) => {
    let brokenImagesCount = 0;
    for (const item of images) {
      const src = await item.getAttribute("src");
      expect(src).toBeTruthy();
      const srcURL = new URL(src!, page.url()).href;
      const response = await page.request.get(srcURL);
      if (response.status() == 404) {
        brokenImagesCount++;
      }
    }
    expect(brokenImagesCount).toBe(2);
  });
});

test.describe("5. Challenging DOM", async () => {
  test.beforeEach(async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Challenging DOM");
  });

  test("5.1 Проверка данных таблицы", async ({ app }) => {
    const valueRowBefore = await app.page5.tableValue.allTextContents();
    log("5.1 | Таблица до: " + valueRowBefore.slice(0, -2));
    await app.page5.clickBlue();
    await expect(app.page5.tableValue.first()).toHaveText(valueRowBefore[0]);
    const valueRowAfter = await app.page5.tableValue.allTextContents();
    log("5.1 | Таблица после: " + valueRowAfter.slice(0, -2));
    expect(valueRowBefore).toEqual(valueRowAfter);
  });

  test("5.2 Проверка текста кнопок", async ({ app }) => {
    const valueBlueBefore = await app.page5.buttonBlue.innerText();
    log("5.2 | Текст до: " + valueBlueBefore);
    await app.page5.clickBlue();
    let valueBlueAfter = await app.page5.buttonBlue.innerText();
    while (valueBlueBefore == valueBlueAfter) {
      log("5.2 | Текст совпал");
      await app.page5.clickBlue();
      valueBlueAfter = await app.page5.buttonBlue.innerText();
    }
    log("5.2 | Текст после: " + valueBlueAfter);
    expect(valueBlueBefore).not.toEqual(valueBlueAfter);
  });

  test("5.3 Проверка перерисовки Canvas", async ({ app }) => {
    const valueCanvasBefore = await app.page5.getCanvas();
    await app.page5.clickBlue();
    const valueCanvasAfter = await app.page5.getCanvas();
    expect(valueCanvasBefore).not.toEqual(valueCanvasAfter);
  });
});

test.describe("6. Checkboxes", async () => {
  test("6.1 Взаимодействие с чекбоксами", async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Checkboxes");

    await expect(app.page6.checkbox).toHaveCount(2);
    await expect(app.page6.checkbox.nth(0)).not.toBeChecked();
    await expect(app.page6.checkbox.nth(1)).toBeChecked();
    await app.page6.clickCheckbox(0);
    await app.page6.clickCheckbox(1);
    await expect(app.page6.checkbox.nth(0)).toBeChecked();
    await expect(app.page6.checkbox.nth(1)).not.toBeChecked();
  });
});

test.describe("7. Context Menu", async () => {
  test("7.1 Взаимодействие с контекстным меню", async ({ app, page }) => {
    await app.page0.navigate();
    await app.page0.click("Context Menu");

    let alertText = "";
    page.once("dialog", async (dialog) => {
      alertText = dialog.message();
      await dialog.accept();
    });
    await app.page7.inputClick();
    expect(alertText).toBe("You selected a context menu");
  });
});

test.describe("8. Digest Authentication", async () => {
  test.beforeEach(async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Digest Authentication");
  });

  test("8.1 Успешная авторизация", async ({ app }) => {
    const response = await app.page8.apply();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);
    await expect(app.page8.text).toContainText("Digest Auth");
  });

  test("8.2 Отказ от авторизации", async ({ app }) => {
    const response = await app.page8.cancel();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(401);
  });
});

test.describe("9. Disappearing Elements", async () => {
  const linkItems = [
    {
      index: 1,
      text: "Home",
      href: "/",
      expectedUrl: `${ENV_BASE_URL}`,
    },
    {
      index: 2,
      text: "About",
      href: "/about/",
      expectedUrl: `${ENV_BASE_URL}/about/`,
    },
    {
      index: 3,
      text: "Contact Us",
      href: "/contact-us/",
      expectedUrl: `${ENV_BASE_URL}/contact-us/`,
    },
    {
      index: 4,
      text: "Portfolio",
      href: "/portfolio/",
      expectedUrl: `${ENV_BASE_URL}/portfolio/`,
    },
  ];

  test.beforeEach(async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Disappearing Elements");
  });

  for (const item of linkItems) {
    test(`9.${item.index} Проверка ссылки "${item.text}"`, async ({
      app,
      page,
    }) => {
      const locatorText = app.page9.linkText(item.text);
      await expect(locatorText).toBeVisible();
      const locatorHref = app.page9.linkHref(item.href);
      await expect(locatorHref).toBeVisible();
      await locatorText.click();
      await expect(page).toHaveURL(item.expectedUrl);
    });
  }
});

test.describe("10. Drag and Drop", async () => {
  test("10.1 Взаимодействие с Drag and Drop", async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Drag and Drop");

    await expect(app.page10.itemA).toHaveText("A");
    await expect(app.page10.itemB).toHaveText("B");
    await app.page10.clickDrag();
    await expect(app.page10.itemA).toHaveText("B");
    await expect(app.page10.itemB).toHaveText("A");
  });
});

test.describe("11. Dropdown List", async () => {
  test("11.1 Взаимодействие с Dropdown List", async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Dropdown");

    await expect(app.page11.dropdown).toBeVisible();
    await expect(app.page11.value).toHaveText("Please select an option");
    await app.page11.dropdown.selectOption({ value: "1" });
    await expect(app.page11.value).toHaveText("Option 1");
    await app.page11.dropdown.selectOption({ label: "Option 2" });
    await expect(app.page11.dropdown).toHaveValue("2");
  });
});

test.describe("12. Dynamic Content", async () => {
  test.beforeEach(async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Dynamic Content");
    await expect(app.page12.itemImg).toHaveCount(3);
    await expect(app.page12.itemText).toHaveCount(3);
  });

  test("12.1 Проверка динамичности контента", async ({ app, page }) => {
    let initImages: (string | null)[];
    let initTexts: string[];
    let newImages: (string | null)[] = [];
    let newTexts: string[];

    const src = await app.page12.itemImg.all();
    initImages = await Promise.all(src.map((item) => item.getAttribute("src")));
    initTexts = await app.page12.itemText.allInnerTexts();
    await page.reload();
    const allImage = await app.page12.itemImg.all();
    for (const item of allImage) {
      const src = await item.getAttribute("src");
      newImages.push(src);
    }
    newTexts = await app.page12.itemText.allInnerTexts();
    expect(newTexts).not.toEqual(initTexts);
    expect(newImages).not.toEqual(initImages);
  });

  test("12.2 Проверка статичности контента", async ({ app, page }) => {
    let initImages: (string | null)[];
    let initTexts: string[];
    let newImages: (string | null)[] = [];
    let newTexts: string[];

    await page.goto(
      "https://the-internet.herokuapp.com/dynamic_content?with_content=static",
    );

    const src = await app.page12.itemImg.all();
    initImages = await Promise.all(src.map((item) => item.getAttribute("src")));
    initTexts = await app.page12.itemText.allInnerTexts();

    do {
      await page.reload();
      newImages = [];
      const allImage = await app.page12.itemImg.all();
      for (const item of allImage) {
        const src = await item.getAttribute("src");
        newImages.push(src);
      }
      newTexts = await app.page12.itemText.allInnerTexts();
    } while (initImages[2] === newImages[2] || initTexts[2] === newTexts[2]);

    newTexts = await app.page12.itemText.allInnerTexts();
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

test.describe("13. Dynamic Loading", async () => {
  test.beforeEach(async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Dynamic Loading");
    await expect(app.page13.link).toHaveCount(2);
  });

  const itemsTests = [
    {
      index: 0,
      title: "Элемент скрыт",
      text: "Example 1: Element on page that is hidden",
      url: `${ENV_BASE_URL}/dynamic_loading/1`,
      init: "hidden",
    },
    {
      index: 1,
      title: "Элемент создается динамически",
      text: "Example 2: Element rendered after the fact",
      url: `${ENV_BASE_URL}/dynamic_loading/2`,
      init: "detached",
    },
  ];

  for (const item of itemsTests) {
    test(`13.${item.index + 1} ${item.title}`, async ({ app, page }) => {
      await expect(app.page13.link.nth(item.index)).toHaveText(item.text);
      await app.page13.clickLink(item.index);
      await expect(page).toHaveURL(item.url);
      if (item.init === "hidden") {
        await expect(app.page13.text).not.toBeVisible();
      } else {
        await expect(app.page13.text).not.toBeAttached();
      }
      await app.page13.clickButton();
      await expect(app.page13.loading).toBeVisible();
      await expect(app.page13.text).toBeVisible();
      await expect(app.page13.loading).not.toBeVisible();
      await expect(app.page13.text).toHaveText("Hello World!");
    });
  }
});

test.describe("14. Entry Ad", async () => {
  test("14.1 Проверка всплывающего окна", async ({ app, page }) => {
    await app.page0.navigate();
    await app.page0.click("Entry Ad");

    await expect(app.page14.modal).toBeVisible();
    await expect(app.page14.modalTitle).toHaveText("This is a modal window");
    await app.page14.clickClose();
    await expect(app.page14.modal).not.toBeVisible();
    await page.reload();
    await expect(app.page14.modal).not.toBeVisible();
    await app.page14.clickReEnable();
    await page.reload();
    await expect(app.page14.modal).toBeVisible();
  });
});

test.describe("15. Exit Intent", async () => {
  test("15.1 Проверка всплывающего окна при уходе со страницы", async ({
    app,
    page,
  }) => {
    await app.page0.navigate();
    await app.page0.click("Exit Intent");

    await expect(app.page15.modal).not.toBeVisible();
    await page.mouse.move(100, 100);
    await page.mouse.move(100, -10);
    await expect(app.page15.modal).toBeVisible();
    await expect(app.page15.modalTitle).toHaveText("This is a modal window");
    await app.page15.clickClose();
    await expect(app.page15.modal).not.toBeVisible();
  });
});

test.describe("16. File Download", async () => {
  test("16.1 Проверка скачивания файлов", async ({ app, page }) => {
    await app.page0.navigate();
    await app.page0.click("File Download");

    const fileName = "test_upload.txt";
    const savePath = join(process.cwd(), "src", "download", fileName);

    await expect(app.page16.fileHref(fileName)).toBeVisible();
    const downloadPromise = page.waitForEvent("download");
    await app.page16.clickFile(fileName);
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(fileName);
    await download.saveAs(savePath);
    const fileExists = existsSync(savePath);
    expect(fileExists).toBe(true);
    const fileStats = statSync(savePath);
    expect(fileStats.size).toBeGreaterThan(0);
  });
});

test.describe("17. File Upload", async () => {
  test("17.1 Проверка загрузки файлов", async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("File Upload");

    await expect(app.page17.input).toBeVisible();
    await app.page17.loadFile();
    await expect(app.page17.text).toHaveText("test_upload.txt");
  });
});

test.describe("18. Floating Menu", async () => {
  test("18.1 Проверка плавающего меню", async ({ app, page }) => {
    await app.page0.navigate();
    await app.page0.click("Floating Menu");

    await expect(app.page18.menu).toBeVisible();
    // await expect(testingPage.menu).toHaveCSS("position", "absolute");
    const menuStyles = await app.page18.menu.evaluate((item) => {
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
    await expect(app.page18.menu).toBeInViewport();
    await app.page18.clickLink("Home");
    await expect(page).toHaveURL(`${ENV_BASE_URL}/floating_menu#home`);
  });
});

test.describe("19. Forgot Password", async () => {
  test("19.1 Восстановление пароля", async ({ app, page }) => {
    await app.page0.navigate();
    await app.page0.click("Forgot Password");

    await expect(app.page19.input).toBeVisible();
    await expect(app.page19.button).toBeVisible();
    await app.page19.inputFill("test@example.com");
    const requestPromise = page.waitForRequest(
      (request) =>
        request.url().includes("/forgot_password") &&
        request.method() === "POST",
    );
    const responsePromise = page.waitForResponse(
      (response) => response.url().includes("/forgot_password"),
      //   && response.request().method() === "POST",
    );
    await app.page19.clickButton();
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

test.describe("20. Form Authentication", async () => {
  test.beforeEach(async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Form Authentication");
  });

  test("20.1 Успешная авторизация", async ({ app, page }) => {
    await Promise.all([
      expect(app.page20.inputUsername).toBeVisible(),
      expect(app.page20.inputPassword).toBeVisible(),
    ]);
    await app.page20.fillForm("tomsmith", "SuperSecretPassword!");
    await expect(app.page20.textArert).toHaveText(
      /You logged into a secure area!/,
    );
    // await expect(testingPage.textArert).toContainText(
    //   "You logged into a secure area!",
    // );
    await expect(page).toHaveURL(`${ENV_BASE_URL}/secure`);
    await app.page20.clickLogout();
    await expect(page).toHaveURL(`${ENV_BASE_URL}/login`);
  });

  test("20.2 Авторизация с неверными данными", async ({ app, page }) => {
    await Promise.all([
      expect(app.page20.inputUsername).toBeVisible(),
      expect(app.page20.inputPassword).toBeVisible(),
    ]);
    await app.page20.fillForm("tomsmith", "qwe");
    await expect(app.page20.textArert).toHaveText(/Your password is invalid!/);
    await expect(page).toHaveURL(`${ENV_BASE_URL}/login`);
  });

  test("20.3 Переход на страницу после авторизаци", async ({ app, page }) => {
    page.goto(`${ENV_BASE_URL}/secure`);
    await expect(app.page20.textArert).toHaveText(
      /You must login to view the secure area!/,
    );
    await expect(page).toHaveURL(`${ENV_BASE_URL}/login`);
  });
});

test.describe("21. Frames", async () => {
  test.beforeEach(async ({ app }) => {
    await app.page0.navigate();
    await app.page0.click("Frames");
  });

  test("21.1 Работа с Frame", async ({ app }) => {
    await app.page21.clickLink("Nested Frames");
    await expect(app.page21.getCurrentFrame("LEFT")).toHaveText(/LEFT/);
    await expect(app.page21.getCurrentFrame("MIDDLE")).toHaveText(/MIDDLE/);
    await expect(app.page21.getCurrentFrame("RIGHT")).toHaveText(/RIGHT/);
    await expect(app.page21.getCurrentFrame("BOTTOM")).toHaveText(/BOTTOM/);
  });

  test("21.2 Работа с iFrame", async ({ app }) => {
    await app.page21.clickLink("iFrame");
    await expect(app.page21.iframeText).toHaveText(/Your content goes here./);
  });
});

test.describe("22. Geolocation", () => {
  test("22.1 Проверка работы геолокации", async ({ page, context, app }) => {
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ latitude: 48.8566, longitude: 2.3522 });
    await app.page0.navigate();
    await app.page0.click("Geolocation");

    await expect(app.page22.button).toBeVisible();
    await app.page22.clickButton();
    await expect(app.page22.latitudeText).toHaveText(/48\.8566/);
    await expect(app.page22.longitudeText).toHaveText(/2\.3522/);
  });
});
