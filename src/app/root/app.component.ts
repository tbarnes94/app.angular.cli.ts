import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthLogout } from '../../modules/auth';
import { AuthService } from '../../modules/auth';
import { CommonService } from '../../modules/commons';
import { TranslateLanguage } from '../../modules/translate';
import { TranslateService } from '../../modules/translate';

/**
 * https://angular.io/guide/styleguide#app-root-module
 */
@Component({
  selector: 'app-root',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class='col-xs-12'>
      <div>
        <h1>{{ 'app.root.title' | translate }}</h1>
      </div>
      <div>
        <button (click)='onLanguage("en-US")' class='btn btn-link' >English</button>
        <button (click)='onLanguage("fr-CA")' class='btn btn-link' >Français</button>
      </div>
      <div>
        <router-outlet></router-outlet>
      </div>
      <div>
        <button
          *ngIf='( this.token$ | async )'
          (click)='onLogout()'
          class='btn btn-primary'
          >
          {{ 'app.root.logout' | translate }}
        </button>
      </div>
    </div>
  `,
})
export class AppComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public token$: Observable<boolean>;

  /**
   * https://angular.io/api/core/OnInit
   */
  public ngOnInit(): void {
    this.token$ = this.auth.token$;
  }

  /**
   * @param input
   */
  public onLanguage(input: string): void {
    this.common.dispatch(new TranslateLanguage(input));
  }

  /**
   * @param input
   */
  public onLogout(): void {
    this.common.dispatch(new AuthLogout(null));
  }

  /**
   * Constructor
   * @param common      https://angular.io/tutorial/toh-pt4
   * @param auth        https://angular.io/tutorial/toh-pt4
   * @param translate   https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly common: CommonService,
                     protected readonly auth: AuthService,
                     protected readonly translate: TranslateService) {
  }

}
