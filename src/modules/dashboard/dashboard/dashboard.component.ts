import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { AuthLogout } from '../../auth';
import { CommonComponent } from '../../commons';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'dashboard-dashboard',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <template-basic
      *ngIf='( "dashboard" | translate ) as translations'
      [key]='"dashboard"'
      [translations]='translations'
      >
      <div class='template-content-loads' >
        <button (click)='this.onLogout()' md-raised-button color='primary' >
          {{ translations.dashboard.logout }}
        </button>
      </div>
    </template-basic>
  `,
})
export class DashboardDashboardComponent extends CommonComponent {

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onLogout(): void {
    this.common.dispatch(new AuthLogout(null));
  }

}
