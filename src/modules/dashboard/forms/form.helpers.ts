import { Validators } from '@angular/forms';

import { AlphaAllPattern } from '../../commons';
import { CommonService } from '../../commons';
import { NumericAllPattern } from '../../commons';
import { toRegex } from '../../commons';
import { toRegexGroup } from '../../commons';

/**
 * https://angular.io/api/forms/FormGroup
 */
export function FormBuild(o: any): any {
  const t: any = o.translations;
  const AlphaRegex: RegExp = toRegex(toRegexGroup(AlphaAllPattern));
  const NumericRegex: RegExp = toRegex(toRegexGroup(NumericAllPattern));
  return {
    divider: true,
    actions: [ {
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
      disabled: (f) => (!f.controls.form.controls.check.controls.one.value),
      click: 'onLogout',
      type: 'button',
    } ],
    sections: [ {
      key: 'form',
      divider: true,
      children: [ {
        key: 'input',
        label: t.input.label,
        tooltip: t.input.tooltip,
        error: t.input.error,
        onValue: (f, m) => {
          f.controls.form.controls.shown.controls.hides.controls.one.setValue(m.controls.one.value);
        },
        width: '50%',
        children: [ {
          key: 'one',
          element: 'input',
          validators: [ Validators.required, Validators.pattern(NumericRegex) ],
          placeholder: t.input.placeholder,
          maxlength: 100,
          prefix: 'dollar',
          suffix: 'times',
          type: 'text',
          width: '100%'
        } ]
      }, {
        key: 'multiple',
        label: t.multiple.label,
        tooltip: t.multiple.tooltip,
        error: t.multiple.error,
        width: '50%',
        children: [ {
          key: 'one',
          element: 'input',
          validators: [ Validators.required, Validators.pattern(AlphaRegex) ],
          placeholder: t.multiple.placeholder.one,
          maxlength: 100,
          type: 'text',
          width: '50%'
        }, {
          key: 'two',
          element: 'input',
          validators: [ Validators.required, Validators.pattern(AlphaRegex) ],
          placeholder: t.multiple.placeholder.two,
          maxlength: 100,
          type: 'text',
          width: '50%'
        } ]
      }, {
        key: 'datepicker',
        label: t.datepicker.label,
        tooltip: t.datepicker.tooltip,
        error: t.datepicker.error,
        width: '50%',
        children: [ {
          key: 'one',
          element: 'datepicker',
          validators: [ Validators.required ],
          readonly: true,
          placeholder: t.datepicker.placeholder,
          maxlength: 100,
          type: 'text',
          min: new Date(),
          max: new Date('2020-01-01'),
          width: '100%'
        } ]
      }, {
        key: 'selects',
        label: t.selects.label,
        tooltip: t.selects.tooltip,
        error: t.selects.error,
        onValue: (f, m) => {
          f.controls.form.controls.radio.controls.one.setValue(null);
        },
        width: '50%',
        children: [ {
          key: 'one',
          element: 'select',
          validators: [ Validators.required ],
          placeholder: t.selects.placeholder,
          options: t.selects.options,
          width: '100%'
        } ]
      }, {
        key: 'shown',
        section: true,
        width: '50%',
        children: [ {
          key: 'shown',
          label: t.shown.label,
          tooltip: t.shown.tooltip,
          error: t.shown.error,
          width: '100%',
          children: [ {
            key: 'one',
            element: 'input',
            validators: [ Validators.required ],
            placeholder: t.shown.placeholder,
            maxlength: 100,
            type: 'text',
            width: '100%'
          } ]
        }, {
          key: 'hides',
          label: (f) => ( f.controls.form.controls.shown.controls.shown.controls.one.value ),
          tooltip: t.hides.tooltip,
          error: t.hides.error,
          shown: (f) => ( f.controls.form.controls.shown.controls.shown.controls.one.value ),
          width: '100%',
          children: [ {
            key: 'one',
            element: 'input',
            validators: [ Validators.required ],
            placeholder: t.hides.placeholder,
            maxlength: 100,
            type: 'text',
            width: '100%'
          } ]
        } ]
      }, {
        key: 'radio',
        label: t.radio.label,
        tooltip: t.radio.tooltip,
        error: t.radio.error,
        width: '50%',
        children: [ {
          key: 'one',
          element: 'radio',
          validators: [ Validators.required ],
          color: 'accent',
          options: (f) => ( t.radio.options[ f.controls.form.controls.selects.controls.one.value ] ),
          width: '100%'
        } ]
      }, {
        key: 'check',
        label: t.check.label,
        tooltip: t.check.tooltip,
        error: t.check.error,
        width: '50%',
        children: [ {
          key: 'one',
          element: 'check',
          validators: [ Validators.requiredTrue ],
          color: 'warn',
          label: t.check.placeholder,
          width: '100%'
        } ]
      } ],
    } ]
  };
}

/**
 * https://angular.io/api/forms/FormGroup
 */
export function FormSubmit(service: CommonService, input: any): void {
  const value: any = input.form;
  console.log(value);
}
