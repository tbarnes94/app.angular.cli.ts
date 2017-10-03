import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TemplateCommonComponent } from '../../template';
import { AuthLoginStart } from '../shared/store/auth.actions';
import { AuthCredentials } from '../shared/types/auth.credentials';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'auth-login',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <template-basic
      *ngIf='( "auth" | translate ) as translations'
      [key]='"login"'
      [translations]='translations'
      [loads$]='this.loader$'
      [error$]='this.error$'
      divider='true'
      >
      <div class='template-content' >
        <form (ngSubmit)='this.onSubmit(this.datas)' #forms='ngForm' >
          <div fxLayout='row' fxLayout.xs='column' fxLayoutWrap class='flex-wrapper' >
            <!-- username -->
            <div class='form-group flex-block' fxFlex='0 0 calc(50%-30px)' >
              <label for='username' >
                {{ translations.login.username.label }}
              </label>
              <md-form-field>
                <input mdInput [(ngModel)]='this.datas.username' type='text' required #username='ngModel' id='username' name='username' />
                <md-error [hidden]='( username.pristine || username.valid )' >
                  {{ translations.login.username.error.required }}
                </md-error>
              </md-form-field>
            </div>
            <!-- password -->
            <div class='form-group flex-block' fxFlex='0 0 calc(50%-30px)' >
              <label for='password' >
                {{ translations.login.password.label }}
              </label>
              <md-form-field>
                <input mdInput [(ngModel)]='this.datas.password' type='password' required #password='ngModel' id='password' name='password' />
                <md-error [hidden]='( password.pristine || password.valid )' >
                  {{ translations.login.password.error.required }}
                </md-error>
              </md-form-field>
            </div>
          </div>
          <!-- actions -->
          <div class='form-group' >
            <button [disabled]='( this.loader$ | async ) || !forms.form.valid' md-raised-button color='primary' type='submit' >
              {{ translations.login.submit }}
            </button>
          </div>
        </form>
      </div>
    </template-basic>
  `,
})
export class AuthLoginComponent extends TemplateCommonComponent {

  /**
   * https://angular.io/guide/forms
   */
  public datas: AuthCredentials = new AuthCredentials(null, null);

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly error$: Observable<string> = this.common.select<string>(['auth', 'error']).takeUntil(this.destroy$);

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly loader$: Observable<boolean> = this.common.select<boolean>(['auth', 'loader']).takeUntil(this.destroy$);

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onSubmit(input: AuthCredentials): void {
    this.common.dispatch(new AuthLoginStart(input));
  }

}
