import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormControlModel } from '@ng2-dynamic-forms/core';
import { DynamicInputModel } from '@ng2-dynamic-forms/core';
import { Observable } from 'rxjs/Rx';

import { CommonComponent } from '../../commons';
import { AuthLoginStart } from '../shared/store/auth.actions';
import { AuthCredentials } from '../shared/types/auth.credentials';

/**
 * https://angular.io/guide/ngmodule#declare-directives-and-components
 */
@Component({
  selector: 'auth-login',
  styleUrls: [ './login.component.scss' ],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <form
      [formGroup]="this.formGroup"
      (submit)="this.onSubmit(this.formGroup.value)"
      >
      <div class="row">
        <dynamic-bootstrap-form-control
          *ngFor="let control of this.formModel" 
          [hasErrorMessaging]="control.hasErrorMessages"
          [group]="this.formGroup"
          [model]="control"
          >
        </dynamic-bootstrap-form-control>
      </div>
      <div 
        *ngIf="( this.error$ | async ) as error"
        class="error"
        >
        {{ error.message }}
      </div>
      <div *ngIf="( this.loader$ | async )">
        Loading...
      </div>
      <button
        [disabled]="this.formGroup.invalid"
        class="btn btn-primary"
        type="submit"
        >
        Submit
      </button>
    </form>
  `,
})
export class AuthLoginComponent extends CommonComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public error$: Observable<string>;
  public loader$: Observable<string>;

  /**
   * https://github.com/udos86/ng2-dynamic-forms
   */
  public formGroup: FormGroup;
  public formModel: Array<DynamicFormControlModel> = [

    new DynamicInputModel({
      id: "username",
      label: "Username",
      errorMessages: {
        required: "{{ label }} is required."
      },
      validators: {
        required: null,
      },
    }, {
      grid: {
        container: "col-xs-12 col-sm-6"
      }
    }),

    new DynamicInputModel({
      id: "password",
      label: "Password",
      errorMessages: {
        required: "{{ label }} is required."
      },
      validators: {
        required: null,
      },
    }, {
      grid: {
        container: "col-xs-12 col-sm-6"
      }
    }),

  ];

  /**
   * https://angular.io/api/core/OnInit
   */
  public ngOnInit(): void {
    this.error$ = this.common.select<string>(['auth', 'error']).takeUntil(this.destroy$);
    this.loader$ = this.common.select<string>(['auth', 'loader']).takeUntil(this.destroy$);
    this.formGroup = this.forms.createFormGroup(this.formModel);
  }

  /**
   * @param input
   */
  public onSubmit(input: AuthCredentials): void {
    this.common.dispatch(new AuthLoginStart(input));
  }


}
