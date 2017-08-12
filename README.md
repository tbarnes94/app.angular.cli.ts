# app.angular.cli.ts

> [![License][license-src]][license-lnk]
> [![Travis][travis-src]][travis-lnk]
> [![Coveralls][coveralls-src]][coveralls-lnk]
> [![Releases][releases-src]][releases-lnk]
> [![Pull Requests][pullrequest-src]][pullrequest-lnk]
> [![Issues][issues-src]][issues-lnk]

[@angular/cli](https://github.com/angular/angular-cli) @ 1.3.0

# Setup

* Install [Augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd)
* Install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

```
npm install -g yarn
npm install -g @angular/cli
yarn
```

# Commands

| Command                                   | Description                                                                | Location                                       | Notes                                         |
|-------------------------------------------|----------------------------------------------------------------------------|------------------------------------------------|-----------------------------------------------|
|                                           |                                                                            |                                                |                                               |
| `ng serve`                                | __Development Server__ with `webpack-dev-server`                           | [http://localhost:4200](http://localhost:4200) | Automatically reloaded on source file changes |
| `ng serve --proxy-config proxy.conf.json` | __Development Server__ with `webpack-dev-server` and `proxy configuration` | [http://localhost:4200](http://localhost:4200) | Automatically reloaded on source file changes |
|                                           |                                                                            |                                                |                                               |
| `yarn doc`                                | __Documentation Generation__ with `typedoc`                                | `./docs`                                       |                                               |
| `ng lint`                                 | __Static Code Analysis__ with `tslint`                                     |                                                |                                               |
| `ng test`                                 | __Unit Tests__ with `karma`                                                |                                                |                                               |
| `ng test --code-coverage`                 | __Unit Tests__ with `karma` and `coverage`                                 | `./coverage`                                   |                                               |
| `ng test --code-coverage --single-run`    | __Unit Tests__ with `karma`, `coverage`, and no `watch`                    | `./coverage`                                   |                                               |
| `ng e2e`                                  | __End to End Tests__ with `protractor`                                     |                                                |                                               |
|                                           |                                                                            |                                                |                                               |
| `ng build`                                | __Build Artifact__ with `webpack`                                          | `./dist`                                       |                                               |
| `ng build -prod`                          | __Build Artifact__ with `webpack` and `production mode`                    | `./dist`                                       |                                               |
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
