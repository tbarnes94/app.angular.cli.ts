import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DynamicInputModel } from '@ng2-dynamic-forms/core';
import { DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD } from '@ng2-dynamic-forms/core';
import { Observable } from 'rxjs/Rx';

import { CommonComponent } from '../../commons';
import { isNotEmpty } from '../../commons';
import { AuthLoginStart } from '../shared/store/auth.actions';
import { AuthCredentials } from '../shared/types/auth.credentials';

/**
 * https://angular.io/guide/ngmodule#declare-directives-and-components
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
      <div *ngIf='( this.forms$ | async ) as forms' class='template-content' >
        <form [formGroup]='forms.group' (submit)='this.onSubmit(forms.group.value)' >
          <div class='row' >
            <dynamic-material-form-control
              *ngFor='let control of forms.model'
              [hasErrorMessaging]='control.hasErrorMessages'
              [group]='forms.group'
              [model]='control'
              >
            </dynamic-material-form-control>
          </div>
          <button [disabled]='forms.group.invalid' md-raised-button color='primary' type='submit' >
            {{ translations.login.submit }}
          </button>
        </form>
      </div>
    </template-basic>
  `,
})
export class AuthLoginComponent extends CommonComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly forms$: Observable<any> = this.build().takeUntil(this.destroy$);
  public readonly error$: Observable<string> = this.common.select<string>(['auth', 'error']).takeUntil(this.destroy$);
  public readonly loader$: Observable<boolean> = this.common.select<boolean>(['auth', 'loader']).takeUntil(this.destroy$);

  /**
   * @returns http://reactivex.io/documentation/observable.html
   */
  public build(): Observable<any> {

    return Observable.combineLatest(
        this.common.select<any>(['translate', 'translations'])
      )
      .map((o) => ({ translations: o[0] }))
      .filter((o) => (isNotEmpty(o.translations)))
      .map((o) => ([
        new DynamicInputModel({
          id: 'username',
          label: o.translations.auth.login.username.label,
          errorMessages: {
            required: o.translations.auth.login.username.error.required,
          },
          validators: {
            required: null,
          },
        }, {
          element: {
            container: 'col-xs-12 col-sm-6'
          }
        }),
        new DynamicInputModel({
          id: 'password',
          inputType: DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD,
          label: o.translations.auth.login.password.label,
          errorMessages: {
            required: o.translations.auth.login.password.error.required,
          },
          validators: {
            required: null,
          },
        }, {
          element: {
            container: 'col-xs-12 col-sm-6'
          }
        }),
      ]))
      .map((o) => ({ model: o, group: null }))
      .map((o: any) => {
        o.group = this.forms.createFormGroup(o.model);
        return o;
      })
      .takeUntil(this.destroy$)
      ;

  }

  /**
   * @param input
   */
  public onSubmit(input: AuthCredentials): void {
    this.common.dispatch(new AuthLoginStart(input));
  }

}
