import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { TemplateContainerComponent } from '../../template';
import { AuthLoginStart } from '../shared/store/auth.actions';

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
        <form
          (ngSubmit)='this.onSubmit(this.form)'
          [formGroup]='this.form'
          >
          <div
            fxLayout='row'
            fxLayout.xs='column'
            fxLayoutWrap
            class='flex-wrapper'
            >
            <!-- username -->
            <div
              class='form-group flex-block'
              fxFlex='0 0 calc(50%-30px)'
              >
              <label for='username' >
                {{ translations.login.username.label }}
              </label>
              <mat-form-field>
                <input
                  matInput
                  [formControlName]='"username"'
                  id='username'
                  name='username'
                  type='text'
                  required
                  />
                <mat-error *ngIf=
                  '(
                    ( !this.form.controls.username.pristine || ( this.check$ | async ) ) &&
                    ( this.form.controls.username.invalid )
                  )'
                  >
                  {{ translations.login.username.error.required }}
                </mat-error>
              </mat-form-field>
            </div>
            <!-- password -->
            <div
              class='form-group flex-block'
              fxFlex='0 0 calc(50%-30px)'
              >
              <label for='password' >
                {{ translations.login.password.label }}
              </label>
              <mat-form-field>
                <input
                  matInput
                  [formControlName]='"password"'
                  id='password'
                  name='password'
                  type='password'
                  required
                  />
                <mat-error *ngIf=
                  '(
                    ( !this.form.controls.password.pristine || ( this.check$ | async ) ) &&
                    ( this.form.controls.password.invalid )
                  )'
                  >
                  {{ translations.login.password.error.required }}
                </mat-error>
              </mat-form-field>
            </div>
          </div>
          <!-- actions -->
          <div class='form-group' >
            <button
              mat-raised-button
              [disabled]='( this.loader$ | async )'
              color='primary'
              type='submit'
              >
              {{ translations.login.submit }}
            </button>
          </div>
        </form>
      </div>
    </template-basic>
  `,
})
export class AuthLoginComponent extends TemplateContainerComponent {

  /**
   * https://angular.io/api/forms/FormGroup
   */
  public form: FormGroup = this.formbuilder.group({
    username: [ null, [ Validators.required ] ],
    password: [ null, [ Validators.required ] ],
  });

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {
    this.streams('auth');
  }

  /**
   * https://angular.io/guide/user-input
   * @param form
   */
  public onSubmit(form: FormGroup): void {
    if (form.valid) { this.common.dispatch(new AuthLoginStart(form.value)); }
    this.check$.next(true);
  }

}
