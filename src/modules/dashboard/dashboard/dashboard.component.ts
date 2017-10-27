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

          actions: [{
            key: 'complete',
            label: t.complete,
            element: 'button',
            color: 'primary',
            disabled: (o.loader),
            route: null,
            click: null,
            target: null,
            href: null,
            type: 'submit',
          }, {
            key: 'a.href',
            label: t.actions.href,
            element: 'a',
            color: 'accent',
            disabled: false,
            route: null,
            click: null,
            target: '_blank',
            href: 'https://www.google.com',
            type: null,
          }, {
            key: 'a.click',
            label: t.actions.click,
            element: 'a',
            color: 'accent',
            disabled: false,
            route: null,
            click: 'onLogout',
            target: null,
            href: null,
            type: null,
          }, {
            key: 'a.route',
            label: t.actions.route,
            element: 'a',
            color: 'accent',
            disabled: false,
            route: [ '/auth' ],
            click: null,
            target: null,
            href: null,
            type: null,
          }, {
            key: 'logout',
            label: t.logout,
            element: 'button',
            color: 'warn',
            disabled: false,
            route: null,
            click: 'onLogout',
            target: null,
            href: null,
            type: null,
          }],

          sections: [{
            key: 'form',
            title: null,
            description: null,
            children: [{
              key: 'key',
              label: t.key.label,
              tooltip: t.key.tooltip,
              error: t.key.error,
              width: '50%',
              children: [{
                key: 'title',
                element: 'input',
                validators: [ Validators.required ],
                disabled: false,
                readonly: false,
                value: null,
                placeholder: t.key.placeholder,
                maxlength: 100,
                type: 'text',
                width: '100%'
              }]
            }, {
              key: 'name',
              label: t.name.label,
              tooltip: t.name.tooltip,
              error: t.name.error,
              width: '50%',
              children: [{
                key: 'first',
                element: 'input',
                validators: [ Validators.required ],
                disabled: false,
                readonly: false,
                value: null,
                placeholder: t.name.placeholder.first,
                maxlength: 100,
                type: 'text',
                width: '50%'
              }, {
                key: 'last',
                element: 'input',
                validators: [ Validators.required ],
                disabled: false,
                readonly: false,
                value: null,
                placeholder: t.name.placeholder.last,
                maxlength: 100,
                type: 'text',
                width: '50%'
              }]
            }, {
              key: 'birth',
              label: t.birth.label,
              tooltip: t.birth.tooltip,
              error: t.birth.error,
              width: '50%',
              children: [{
                key: 'date',
                element: 'datepicker',
                validators: [ Validators.required ],
                disabled: false,
                readonly: true,
                value: null,
                placeholder: t.birth.placeholder,
                maxlength: 100,
                type: 'text',
                min: new Date(),
                max: new Date('2020-01-01'),
                width: '100%'
              }]
            }, {
              key: 'animal',
              label: t.animal.label,
              tooltip: t.animal.tooltip,
              error: t.animal.error,
              width: '50%',
              children: [{
                key: 'favorite',
                element: 'select',
                validators: [ Validators.required ],
                disabled: false,
                readonly: false,
                value: null,
                placeholder: t.animal.placeholder,
                options: t.animal.options,
                width: '100%'
              }]
            }, {
              key: 'foods',
              label: t.foods.label,
              tooltip: t.foods.tooltip,
              error: t.foods.error,
              width: '50%',
              children: [{
                key: 'favorite',
                element: 'radio',
                validators: [ Validators.required ],
                disabled: false,
                readonly: false,
                value: null,
                color: 'accent',
                options: t.foods.options,
                width: '100%'
              }]
            }, {
              key: 'house',
              label: t.house.label,
              tooltip: t.house.tooltip,
              error: t.house.error,
              width: '50%',
              children: [{
                key: 'fire',
                element: 'check',
                validators: [ Validators.requiredTrue ],
                disabled: false,
                readonly: false,
                value: false,
                color: 'warn',
                label: t.house.placeholder,
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
