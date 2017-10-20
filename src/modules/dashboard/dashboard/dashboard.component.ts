import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { AuthLogout } from '../../auth';
import { TemplateContainerComponent } from '../../template';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'dashboard-dashboard',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <template-basic
      *ngIf='( "dashboard.dashboard" | translate ) as translations'
      [translations]='translations'
      >
      <div class='template-content-loads' >
        <button
          mat-raised-button
          [color]='"primary"'
          (click)='this.onLogout()'
          >
          {{ translations.logout }}
        </button>
      </div>
    </template-basic>
  `,
})
export class DashboardDashboardComponent extends TemplateContainerComponent {

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onLogout(): void {
    this.common.dispatch(new AuthLogout(null));
  }

}
