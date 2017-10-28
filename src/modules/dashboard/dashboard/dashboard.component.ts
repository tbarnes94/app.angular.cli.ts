import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AuthLogout } from '../../auth';
import { FormSchemas } from '../../forms';
import { TemplateContainerComponent } from '../../template';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'dashboard-dashboard',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <template-basic
      *ngIf='( "dashboard.dashboard" | translate ) as translations'
      [translations]='translations'
      >
      <div class='template-content' >
        <forms-form
          [schemas]='( this.schemas$ | async )'
          (onCompleteEvent)='this.onComplete($event)'
          (onClickEvent)='this.onClick($event)'
          >
          <div class='form-footer' >
            {{ translations.footer }}
          </div>
        </forms-form>
      </div>
    </template-basic>
  `,
})
export class DashboardDashboardComponent extends TemplateContainerComponent {

  /**
   * https://angular.io/api/forms/FormGroup
   */
  public schemas$: Observable<FormSchemas> = Observable.of(null);

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {

    this.schemas$ = Observable
      .combineLatest(
        Observable.of(false).takeUntil(this.destroy$),
        this.translations$.takeUntil(this.destroy$),
      )
      .map((o) => ({ loader: o[0], translations: o[1] }))
      .filter((o) => (!!o.translations))
      .map((o) => {

        const t: any = o.translations.dashboard.dashboard;

        return {

          divider: true,
          actions: [{
            key: 'complete',
            label: t.complete,
            element: 'button',
            color: 'primary',
            disabled: (o.loader),
            type: 'submit',
          }, {
            key: 'a.href',
            label: t.actions.href,
            element: 'a',
            color: 'accent',
            href: 'https://www.google.com',
            target: '_blank',
          }, {
            key: 'a.click',
            label: t.actions.click,
            element: 'a',
            color: 'accent',
            click: 'onLogout',
          }, {
            key: 'a.route',
            label: t.actions.route,
            element: 'a',
            color: 'accent',
            route: [ '/auth' ],
          }, {
            key: 'logout',
            label: t.logout,
            element: 'button',
            color: 'warn',
            click: 'onLogout',
            type: 'button',
          }],

          sections: [{
            key: 'form',
            divider: true,
            children: [{
              key: 'input',
              label: t.input.label,
              tooltip: t.input.tooltip,
              error: t.input.error,
              width: '50%',
              children: [{
                key: 'one',
                element: 'input',
                validators: [ Validators.required ],
                placeholder: t.input.placeholder,
                maxlength: 100,
                type: 'text',
                width: '100%'
              }]
            }, {
              key: 'input-c',
              label: t['input-c'].label,
              tooltip: t['input-c'].tooltip,
              error: t['input-c'].error,
              width: '50%',
              children: [{
                key: 'one',
                element: 'input',
                validators: [ Validators.required ],
                placeholder: t['input-c'].placeholder.one,
                maxlength: 100,
                type: 'text',
                width: '50%'
              }, {
                key: 'two',
                element: 'input',
                validators: [ Validators.required ],
                placeholder: t['input-c'].placeholder.two,
                maxlength: 100,
                type: 'text',
                width: '50%'
              }]
            }, {
              key: 'datepicker',
              label: t.datepicker.label,
              tooltip: t.datepicker.tooltip,
              error: t.datepicker.error,
              width: '50%',
              children: [{
                key: 'one',
                element: 'datepicker',
                validators: [ Validators.required ],
                placeholder: t.datepicker.placeholder,
                maxlength: 100,
                type: 'text',
                min: new Date(),
                max: new Date('2020-01-01'),
                width: '100%'
              }]
            }, {
              key: 'select',
              label: t.select.label,
              tooltip: t.select.tooltip,
              error: t.select.error,
              width: '50%',
              children: [{
                key: 'one',
                element: 'select',
                validators: [ Validators.required ],
                placeholder: t.select.placeholder,
                options: t.select.options,
                width: '100%'
              }]
            }, {
              key: 'input-s',
              isSection: true,
              width: '50%',
              children: [{
                key: 'input-sa',
                label: t['input-sa'].label,
                tooltip: t['input-sa'].tooltip,
                error: t['input-sa'].error,
                width: '100%',
                children: [{
                  key: 'one',
                  element: 'input',
                  validators: [ Validators.required ],
                  placeholder: t['input-sa'].placeholder,
                  maxlength: 100,
                  type: 'text',
                  width: '100%'
                }]
              }, {
                key: 'input-sb',
                label: t['input-sb'].label,
                tooltip: t['input-sb'].tooltip,
                error: t['input-sb'].error,
                width: '100%',
                children: [{
                  key: 'one',
                  element: 'input',
                  validators: [ Validators.required ],
                  placeholder: t['input-sb'].placeholder,
                  maxlength: 100,
                  type: 'text',
                  width: '100%'
                }]
              }]
            }, {
              key: 'radio',
              label: t.radio.label,
              tooltip: t.radio.tooltip,
              error: t.radio.error,
              width: '50%',
              children: [{
                key: 'one',
                element: 'radio',
                validators: [ Validators.required ],
                color: 'accent',
                options: t.radio.options,
                width: '100%'
              }]
            }, {
              key: 'check',
              label: t.check.label,
              tooltip: t.check.tooltip,
              error: t.check.error,
              width: '50%',
              children: [{
                key: 'one',
                element: 'check',
                validators: [ Validators.requiredTrue ],
                color: 'warn',
                label: t.check.placeholder,
                width: '100%'
              }]
            }],
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
    console.log(value);
  }

  /**
   * https://angular.io/guide/user-input
   */
  public onLogout(): void {
    this.common.dispatch(new AuthLogout(null));
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
