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
  styleUrls: [ './root.component.styl' ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class='container' >
      <router-outlet></router-outlet>
    </div>
    <div *ngIf='( this.languages$ | async ) as languages' class='container languages' >
      <span *ngFor='let language of languages' >
        <button (click)='this.onLanguage(language.id)' md-button color='accent' >
          {{ language.title }}
        </button>
      </span>
    </div>
  `,
})
export class AppRootComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly token$: Observable<boolean> = this.auth.token$;
  public readonly languages$: Observable<Array<any>> = Observable
    .of([
      { id: 'en-US', title: 'English' },
      { id: 'fr-CA', title: 'Français' },
    ])
    ;

  /**
   * @param input
   */
  public onLanguage(input: string): void {
    this.common.dispatch(new TranslateLanguage(input));
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
