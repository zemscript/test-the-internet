import { Page } from "@playwright/test";
import {
  Page0,
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8,
  Page9,
  Page10,
  Page11,
  Page12,
  Page13,
  Page14,
  Page15,
  Page16,
  Page17,
  Page18,
  Page19,
  Page20,
  Page21,
  Page22,
  Page23,
  Page24,
  Page25,
  Page26,
  Page27,
  Page28,
  Page29,
  Page30,
} from "@/pages/pages";

export class App {
  constructor(private readonly page: Page) {}

  get page0() {
    return new Page0(this.page);
  }
  get page1() {
    return new Page1(this.page);
  }
  get page2() {
    return new Page2(this.page);
  }
  get page3() {
    return new Page3(this.page);
  }
  get page4() {
    return new Page4(this.page);
  }
  get page5() {
    return new Page5(this.page);
  }
  get page6() {
    return new Page6(this.page);
  }
  get page7() {
    return new Page7(this.page);
  }
  get page8() {
    return new Page8(this.page);
  }
  get page9() {
    return new Page9(this.page);
  }
  get page10() {
    return new Page10(this.page);
  }
  get page11() {
    return new Page11(this.page);
  }
  get page12() {
    return new Page12(this.page);
  }
  get page13() {
    return new Page13(this.page);
  }
  get page14() {
    return new Page14(this.page);
  }
  get page15() {
    return new Page15(this.page);
  }
  get page16() {
    return new Page16(this.page);
  }
  get page17() {
    return new Page17(this.page);
  }
  get page18() {
    return new Page18(this.page);
  }
  get page19() {
    return new Page19(this.page);
  }
  get page20() {
    return new Page20(this.page);
  }
  get page21() {
    return new Page21(this.page);
  }
  get page22() {
    return new Page22(this.page);
  }
  get page23() {
    return new Page23(this.page);
  }
  get page24() {
    return new Page24(this.page);
  }
  get page25() {
    return new Page25(this.page);
  }
  get page26() {
    return new Page26(this.page);
  }
  get page27() {
    return new Page27(this.page);
  }
  get page28() {
    return new Page28(this.page);
  }
  get page29() {
    return new Page29(this.page);
  }
  get page30() {
    return new Page30(this.page);
  }
}
