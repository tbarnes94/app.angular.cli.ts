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
  styleUrls: [ './app.component.styl' ],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class='container' >
      <h1>{{ 'app.root.title' | translate }}</h1>
      <div *ngIf='( languages$ | async ) as languages' >
        <span *ngFor='let language of languages' >
          <button
            (click)='onLanguage(language.id)'
            class='btn btn-link'
            >
            {{ language.title }}
          </button>
        </span>
      </div>
      <div *ngIf='( this.token$ | async )' >
        <button
          (click)='onLogout()'
          class='btn btn-link'
          >
          {{ 'app.root.logout' | translate }}
        </button>
      </div>
    </div>
    <div class='container' >
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public token$: Observable<boolean>;
  public languages$: Observable<Array<any>> = Observable.of([
    { id: 'en-US', title: 'English' },
    { id: 'fr-CA', title: 'Français' },
  ]);

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
