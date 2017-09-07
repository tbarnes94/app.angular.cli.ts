import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { AuthLogout } from '../../auth';
import { CommonComponent } from '../../commons';

/**
 * https://angular.io/guide/ngmodule#declare-directives-and-components
 */
@Component({
  selector: 'dashboard-dashboard',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <template-basic
      [title]='( "dashboard.dashboard.title" | translate )'
      >
      <div class='template-content' >
        <button (click)='this.onLogout()' md-raised-button color='primary' >
          {{ 'app.root.logout' | translate }}
        </button>
      </div>
    </template-basic>
  `,
})
export class DashboardDashboardComponent extends CommonComponent {

  /**
   * @param input
   */
  public onLogout(): void {
    this.common.dispatch(new AuthLogout(null));
  }

}
