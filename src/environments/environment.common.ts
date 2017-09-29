/** @exports */
export const environment: any = {

  app: {
    production: true,
  },

  api: {
    root: '/api',
    login: {
      method: 'Post',
      path: 'oauth/token',
    },
  },

  translate: {
    asset: './assets/i18ns/',
    extension: '.json',
    start: 'en-US',
  },

};
