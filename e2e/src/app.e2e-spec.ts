import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('sonalake-task-angular App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display the title', () => {
    expect(page.getTitleText()).toEqual('List View');
  });

  it('should open form', () => {
    page.getAddNewButton().click();
    browser.driver.getCurrentUrl().then(function(url) {
      return /\/characters\/add/.test(url);
    });
  });
});
