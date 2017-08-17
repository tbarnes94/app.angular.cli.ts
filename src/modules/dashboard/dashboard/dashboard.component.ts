import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { CommonComponent } from '../../commons';

/**
 * https://angular.io/guide/ngmodule#declare-directives-and-components
 */
@Component({
  selector: 'dashboard-dashboard',
  styleUrls: [ './dashboard.component.styl' ],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div>
      {{ 'dashboard.welcome' | translate }}
    </div>
  `,
})
export class DashboardComponent extends CommonComponent {
}
