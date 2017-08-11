# app.angular.cli.ts

[Angular CLI](https://github.com/angular/angular-cli) @ 1.3.0

# Setup

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
| `ng e2e`                                  | __End to End Tests__ with `protractor`                                     |                                                |                                               |
|                                           |                                                                            |                                                |                                               |
| `ng build`                                | __Build Artifact__ with `webpack`                                          | `./dist`                                       |                                               |
| `ng build -prod`                          | __Build Artifact__ with `webpack` and `production mode`                    | `./dist`                                       |                                               |
|                                           |                                                                            |                                                |                                               |

# Help

* [@angular/cli readme](https://github.com/angular/angular-cli/blob/master/README.md)
* `ng help`
