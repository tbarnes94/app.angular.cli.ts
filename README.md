# app.angular.cli.ts

> [![License][license-src]][license-lnk]
> [![Travis][travis-src]][travis-lnk]
> [![Coveralls][coveralls-src]][coveralls-lnk]
> [![Releases][releases-src]][releases-lnk]
> [![Pull Requests][pullrequest-src]][pullrequest-lnk]
> [![Issues][issues-src]][issues-lnk]

[@angular/cli](https://github.com/angular/angular-cli) @1.6.3

# Setup

## Windows

* Install [Cmder](http://www.cmder.net)
* Install [Node 8+](https://www.nodejs.org/en/download)

```
npm install -g yarn
```

## Proxies

```
npm config set proxy (url)
npm config set https-proxy (url)
yarn config set proxy (url)
yarn config set https-proxy (url)
```

## Runtime

* Install [Augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd)
* Install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

```
yarn global add @angular/cli
yarn install --ignore-optional
```

# Commands

| Command                                   | Description                                                                | Location                                       | Notes                                         |
|-------------------------------------------|----------------------------------------------------------------------------|------------------------------------------------|-----------------------------------------------|
|                                           |                                                                            |                                                |                                               |
| `yarn serve`                              | __Development Server__ with `webpack-dev-server`                           | [http://localhost:4200](http://localhost:4200) | Automatically reloaded on source file changes |
| `yarn start` or `yarn serve:proxy`        | __Development Server__ with `webpack-dev-server` and `proxy configuration` | [http://localhost:4200](http://localhost:4200) | Automatically reloaded on source file changes |
|                                           |                                                                            |                                                |                                               |
| `yarn doc`                                | __Documentation Generation__ with `typedoc`                                | `./docs`                                       |                                               |
| `yarn lint`                               | __Static Code Analysis__ with `tslint`                                     |                                                |                                               |
| `yarn test`                               | __Unit Tests__ with `karma`                                                |                                                |                                               |
| `yarn test:single`                        | __Unit Tests__ with `karma` and no `watch`                                 |                                                |                                               |
| `yarn test:coverage`                      | __Unit Tests__ with `karma` and `coverage`                                 | `./coverage`                                   |                                               |
| `yarn test:coverage:single`               | __Unit Tests__ with `karma`, `coverage`, and no `watch`                    | `./coverage`                                   |                                               |
| `yarn e2e`                                | __End to End Tests__ with `protractor`                                     |                                                |                                               |
|                                           |                                                                            |                                                |                                               |
| `yarn build`                              | __Build Artifact__ with `webpack` and `production mode`                    | `./dist`                                       |                                               |
|                                           |                                                                            |                                                |                                               |

# Help

* [@angular/cli readme](https://github.com/angular/angular-cli/blob/master/README.md)
* `ng help`

---

> License: [MIT][license-lnk]

[license-src]: https://img.shields.io/badge/License-MIT-green.svg?style=flat-square
[license-lnk]: https://choosealicense.com/licenses/mit

[travis-src]: https://img.shields.io/travis/terrandominion/app.angular.cli.ts.svg?style=flat-square
[travis-lnk]: https://travis-ci.org/terrandominion/app.angular.cli.ts

[coveralls-src]: https://img.shields.io/coveralls/terrandominion/app.angular.cli.ts.svg?style=flat-square
[coveralls-lnk]: https://coveralls.io/github/terrandominion/app.angular.cli.ts

[releases-src]: https://img.shields.io/github/downloads/terrandominion/app.angular.cli.ts/total.svg?style=flat-square
[releases-lnk]: https://github.com/terrandominion/app.angular.cli.ts/releases

[pullrequest-src]: https://img.shields.io/github/issues-pr/terrandominion/app.angular.cli.ts.svg?style=flat-square
[pullrequest-lnk]: https://github.com/terrandominion/app.angular.cli.ts/pulls

[issues-src]: https://img.shields.io/github/issues/terrandominion/app.angular.cli.ts.svg?style=flat-square
[issues-lnk]: https://github.com/terrandominion/app.angular.cli.ts/issues
