import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CommonComponent } from '../../modules/commons';
import { AuthService } from '../../section/auth';
import { CommonService } from '../../modules/commons';
import { TranslateLanguage } from '../../modules/translate';
import { TranslateService } from '../../modules/translate';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'app-root',
  styleUrls: [ './root.component.styl' ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class='container' >
      <!-- routlet -->
      <router-outlet></router-outlet>
    </div>
    <!-- language -->
    <div
      *ngIf='( this.languages$ | async ) as languages'
      class='container languages'
      >
      <span *ngFor='let language of languages' >
        <button
          mat-button
          [color]='"accent"'
          (click)='this.onLanguage(language.id)'
          >
          {{ language.title }}
        </button>
      </span>
    </div>
  `,
})
export class AppRootComponent extends CommonComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly token$: Observable<boolean> = this.auth.token$;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly languages$: Observable<Array<any>> = Observable
    .of([
      { id: 'en-US', title: 'English' },
      { id: 'fr-CA', title: 'Français' },
    ])
    ;

  /**
   * https://angular.io/guide/user-input
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
    super();
  }

}
