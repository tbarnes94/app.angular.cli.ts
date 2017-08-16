import { AppPage } from './app-page';

describe('app', () => {

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should return message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Angular');
  });

});
