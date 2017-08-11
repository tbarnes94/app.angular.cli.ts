import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

/**
 * https://angular.io/guide/styleguide#app-root-module
 */
@Component({
  selector: 'app-root',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <h1>Angular</h1>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
}
