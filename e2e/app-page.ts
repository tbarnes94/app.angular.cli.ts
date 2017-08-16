import { browser } from 'protractor';
import { by } from 'protractor';
import { element } from 'protractor';

export class AppPage {

  public navigateTo() {
    return browser.get('/');
  }

  public getParagraphText() {
    const h1 = by.css('app-root h1');
    return element(h1).getText();
  }

}
