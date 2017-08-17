import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DynamicInputModel } from '@ng2-dynamic-forms/core';
import { DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD } from '@ng2-dynamic-forms/core';
import { Observable } from 'rxjs/Rx';

import { CommonComponent } from '../../commons';
import { AuthLoginStart } from '../shared/store/auth.actions';
import { AuthCredentials } from '../shared/types/auth.credentials';

/**
 * https://angular.io/guide/ngmodule#declare-directives-and-components
 */
@Component({
  selector: 'auth-login',
  styleUrls: [ './login.component.styl' ],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div *ngIf='( this.forms$ | async ) as forms' >
      <form
        [formGroup]='forms.group'
        (submit)='this.onSubmit(forms.group.value)'
        >
        <div class='row'>
          <dynamic-bootstrap-form-control
            *ngFor='let control of forms.model'
            [hasErrorMessaging]='control.hasErrorMessages'
            [group]='forms.group'
            [model]='control'
            >
          </dynamic-bootstrap-form-control>
        </div>
        <div
          *ngIf='( this.error$ | async ) as error'
          class='error'
          >
          {{ 'auth.error.' + error | translate }}
        </div>
        <div *ngIf='( this.loader$ | async )'>
          {{ 'auth.loader.message' | translate }}
        </div>
        <button
          [disabled]='forms.group.invalid'
          class='btn btn-primary'
          type='submit'
          >
          {{ 'auth.login.submit' | translate }}
        </button>
      </form>
    </div>
  `,
})
export class AuthLoginComponent extends CommonComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public error$: Observable<string>;
  public loader$: Observable<string>;
  public forms$: Observable<any>;

  /**
   * https://angular.io/api/core/OnInit
   */
  public ngOnInit(): void {

    this.error$ = this.common.select<string>(['auth', 'error']).takeUntil(this.destroy$);
    this.loader$ = this.common.select<string>(['auth', 'loader']).takeUntil(this.destroy$);
    this.forms$ = this.common.select<any>(['translate', 'translations'])
      .filter((o) => (o !== null))
      .map((o) => ([
        new DynamicInputModel({
          id: 'username',
          label: o.auth.login.username.label,
          errorMessages: {
            required: o.auth.login.username.error.required,
          },
          validators: {
            required: null,
          },
        }, {
          grid: {
            container: 'col-xs-12 col-sm-6'
          }
        }),
        new DynamicInputModel({
          id: 'password',
          inputType: DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD,
          label: o.auth.login.password.label,
          errorMessages: {
            required: o.auth.login.username.error.required,
          },
          validators: {
            required: null,
          },
        }, {
          grid: {
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
