import { Validators } from '@angular/forms';

import { CommonService } from '../../../modules/commons';
import { FormAction } from '../../../modules/forms';
import { FormCheck } from '../../../modules/forms';
import { FormDatepicker } from '../../../modules/forms';
import { FormGroup } from '../../../modules/forms';
import { FormInput } from '../../../modules/forms';
import { FormRadio } from '../../../modules/forms';
import { FormSchemas } from '../../../modules/forms';
import { FormSection } from '../../../modules/forms';
import { FormSelect } from '../../../modules/forms';
import { AlphaAllPattern } from '../../../modules/helpers';
import { NumericAllPattern } from '../../../modules/helpers';
import { toRegex } from '../../../modules/helpers';
import { toRegexGroup } from '../../../modules/helpers';

/**
 * https://angular.io/api/forms/FormGroup
 */
export function FormBuild(o: any): FormSchemas {
  const d: any = o.datas;
  const t: any = o.translations;
  const m: any = o.modules;
  const AlphaRegex: RegExp = toRegex(toRegexGroup(AlphaAllPattern));
  const NumericRegex: RegExp = toRegex(toRegexGroup(NumericAllPattern));
  return new FormSchemas(
    m.forms, [
    new FormAction(
      'complete',
      'button',
      t.complete,
      'primary',
      ( o.loader ),
      undefined,
      undefined,
      undefined,
      undefined,
      'submit'
    ),
    new FormAction(
      'a.href',
      'a',
      t.actions.href,
      'accent',
      undefined,
      undefined,
      undefined,
      'https://www.google.com',
      '_blank',
      undefined
    ),
    new FormAction(
      'a.click',
      'a',
      t.actions.click,
      'accent',
      undefined,
      undefined,
      'onLogout',
      undefined,
      undefined,
      undefined
    ),
    new FormAction(
      'a.route',
      'a',
      t.actions.route,
      'accent',
      undefined,
      [ '/auth' ],
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new FormAction(
      'logout',
      'button',
      t.logout,
      'warn',
      (f: any) => (!f.controls.form.controls.check.controls.one.value),
      undefined,
      'onLogout',
      undefined,
      undefined,
      'button'
    ),
  ], [
    new FormSection(
      'form',
      undefined,
      undefined,
      true, [
      new FormGroup(
        'input',
        undefined,
        t.input.label,
        t.input.error,
        undefined,
        (f: any, i: any) => { f.controls.form.controls.shown.controls.hides.controls.one.setValue(i.controls.one.value); },
        t.input.tooltip,
        '50%', [
        new FormInput(
          'one',
          undefined,
          t.input.placeholder,
          [ Validators.required, Validators.pattern(NumericRegex) ],
          undefined,
          undefined,
          undefined,
          '100%',
          100,
          'dollar',
          'times',
          undefined
        ),
      ]),
      new FormGroup(
        'multiple',
        undefined,
        t.multiple.label,
        t.multiple.error,
        undefined,
        undefined,
        t.multiple.tooltip,
        '50%', [
        new FormInput(
          'one',
          undefined,
          t.multiple.placeholder.one,
          [ Validators.required, Validators.pattern(AlphaRegex) ],
          undefined,
          undefined,
          undefined,
          '50%',
          100,
          undefined,
          undefined,
          undefined
        ),
        new FormInput(
          'two',
          undefined,
          t.multiple.placeholder.two,
          [ Validators.required, Validators.pattern(AlphaRegex) ],
          undefined,
          undefined,
          undefined,
          '50%',
          100,
          undefined,
          undefined,
          undefined
        ),
      ]),
      new FormGroup(
        'shown',
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        '50%', [
        new FormGroup(
          'shown',
          undefined,
          t.shown.label,
          t.shown.error,
          undefined,
          undefined,
          t.shown.tooltip,
          '100%', [
          new FormInput(
            'one',
            undefined,
            t.shown.placeholder,
            [ Validators.required ],
            undefined,
            undefined,
            undefined,
            '100%',
            100,
            undefined,
            undefined,
            undefined
          ),
        ]),
        new FormGroup(
          'hides',
          undefined,
          (f: any) => ( f.controls.form.controls.shown.controls.shown.controls.one.value ),
          t.hides.error,
          (f: any) => ( f.controls.form.controls.shown.controls.shown.controls.one.value ),
          undefined,
          t.hides.tooltip,
          '100%', [
          new FormInput(
            'one',
            undefined,
            t.hides.placeholder,
            [ Validators.required ],
            undefined,
            undefined,
            undefined,
            '100%',
            100,
            undefined,
            undefined,
            undefined
          ),
        ]),
      ]),
      new FormGroup(
        'datepicker',
        undefined,
        t.datepicker.label,
        t.datepicker.error,
        undefined,
        undefined,
        t.datepicker.tooltip,
        '50%', [
        new FormDatepicker(
          'one',
          undefined,
          t.datepicker.placeholder,
          [ Validators.required ],
          undefined,
          undefined,
          undefined,
          '100%',
          new Date(),
          new Date('2020-01-01')
        ),
      ]),
      new FormGroup(
        'selects',
        undefined,
        t.selects.label,
        t.selects.error,
        undefined,
        (f: any, i: any) => { f.controls.form.controls.radio.controls.one.setValue(null); },
        t.selects.tooltip,
        '50%', [
        new FormSelect(
          'one',
          undefined,
          t.selects.placeholder,
          [ Validators.required ],
          undefined,
          undefined,
          undefined,
          '100%',
          t.selects.options
        ),
      ]),
      new FormGroup(
        'radio',
        undefined,
        t.radio.label,
        t.radio.error,
        undefined,
        undefined,
        t.radio.tooltip,
        '50%', [
        new FormRadio(
          'one',
          undefined,
          undefined,
          [ Validators.required ],
          undefined,
          undefined,
          undefined,
          '100%',
          'accent',
          (f: any) => ( t.radio.options[ f.controls.form.controls.selects.controls.one.value ] )
        ),
      ]),
      new FormGroup(
        'check',
        undefined,
        t.check.label,
        t.check.error,
        undefined,
        undefined,
        t.check.tooltip,
        '50%', [
        new FormCheck(
          'one',
          undefined,
          t.check.placeholder,
          [ Validators.requiredTrue ],
          undefined,
          undefined,
          undefined,
          '100%',
          'warn',
        ),
      ]),
    ]),
  ], true);
}

/**
 * https://angular.io/api/forms/FormGroup
 */
export function FormSubmit(service: CommonService, input: any): void {
  const value: any = input.form;
  console.log(value);
}
