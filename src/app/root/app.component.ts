import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthLogout } from '../../modules/auth';
import { CommonComponent } from '../../modules/commons';

/**
 * https://angular.io/guide/styleguide#app-root-module
 */
@Component({
  selector: 'app-root',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class="col-xs-12">
      <div>
        <h1>Angular</h1>
      </div>
      <div>
        <router-outlet></router-outlet>
      </div>
      <div>
        <button
          *ngIf="( this.token$ | async )"
          (click)="onLogout()"
          class="btn btn-primary"
          >
          Logout
        </button>
      </div>
    </div>
  `,
})
export class AppComponent extends CommonComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public token$: Observable<boolean>;

  /**
   * https://angular.io/api/core/OnInit
   */
  public ngOnInit(): void {
    this.token$ = this.auth.token$.takeUntil(this.destroy$);
  }

  /**
   * @param input
   */
  public onLogout(): void {
    this.common.dispatch(new AuthLogout(null));
  }

}
