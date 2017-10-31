import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { FormSchemas } from '../../forms';
import { TemplateContainerComponent } from '../../template';
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
      *ngIf='( "auth.login" | translate ) as translations'
      [loads]='( this.loader$ | async )'
      [error]='( this.error$ | async )'
      [translations]='translations'
      [divider]='false'
      >
      <div class='template-content' >
        <forms-form
          [schemas]='( this.schemas$ | async )'
          (onCompleteEvent)='this.onComplete($event)'
          (onClickEvent)='this.onClick($event)'
          >
        </forms-form>
      </div>
    </template-basic>
  `,
})
export class AuthLoginComponent extends TemplateContainerComponent {

  /**
   * https://angular.io/api/forms/FormGroup
   */
  public schemas$: Observable<FormSchemas> = Observable.of(null);

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {

    this.streams('auth');
    this.schemas$ = Observable
      .combineLatest(
        this.loader$.takeUntil(this.destroy$),
        this.translations$.takeUntil(this.destroy$),
      )
      .map((o) => ({ loader: o[0], translations: o[1] }))
      .filter((o) => (!!o.translations))
      .map((o) => {

        const t: any = o.translations.auth.login;

        return {

          actions: [{
            key: 'complete',
            label: t.submit,
            element: 'button',
            color: 'primary',
            disabled: (i) => (o.loader),
            type: 'submit',
          }],

          sections: [{
            key: 'form',
            children: [{
              key: 'username',
              label: t.username.label,
              error: t.username.error,
              width: '50%',
              children: [{
                key: 'i',
                element: 'input',
                validators: [ Validators.required ],
                maxlength: 100,
                type: 'text',
                width: '100%'
              }]
            }, {
              key: 'password',
              label: t.password.label,
              error: t.password.error,
              width: '50%',
              children: [{
                key: 'i',
                element: 'input',
                validators: [ Validators.required ],
                maxlength: 100,
                type: 'password',
                width: '100%'
              }]
            }]
          }]

        };

      })
      ;

  }

  /**
   * https://angular.io/guide/user-input
   * @param forms
   */
  public onComplete(forms: FormGroup): void {
    const value: any = forms.value.form;
    const payload: AuthCredentials = new AuthCredentials(value.username.i, value.password.i);
    this.common.dispatch(new AuthLoginStart(payload));
  }

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onClick(input: string): void {
    if (typeof this[ input ] === 'function') {
      this[ input ]();
    }
  }

}
