import { Validators } from '@angular/forms';

import { CommonService } from '../../../modules/commons';
import { FormAction } from '../../../modules/forms';
import { FormGroup } from '../../../modules/forms';
import { FormInput } from '../../../modules/forms';
import { FormSchemas } from '../../../modules/forms';
import { FormSection } from '../../../modules/forms';
import { AuthLoginStart } from '../shared/store/auth.actions';
import { AuthCredentials } from '../shared/types/auth.credentials';

/**
 * https://angular.io/api/forms/FormGroup
 */
export function FormBuild(o: any): FormSchemas {
  const t: any = o.translations;
  return new FormSchemas([
    new FormAction(
      'complete',
      'button',
      t.submit,
      'primary',
      ( o.loader ),
      undefined,
      undefined,
      undefined,
      undefined,
      'submit'
    ),
  ], [
    new FormSection(
      'form',
      undefined,
      undefined,
      undefined, [
      new FormGroup(
        'username',
        undefined,
        t.username.label,
        t.username.error,
        undefined,
        undefined,
        undefined,
        '50%', [
        new FormInput(
          'one',
          undefined,
          [ Validators.required ],
          undefined,
          undefined,
          undefined,
          '100%',
          undefined,
          100,
          undefined,
          undefined,
          undefined
        ),
      ]),
      new FormGroup(
        'password',
        undefined,
        t.password.label,
        t.password.error,
        undefined,
        undefined,
        undefined,
        '50%', [
        new FormInput(
          'one',
          undefined,
          [ Validators.required ],
          undefined,
          undefined,
          undefined,
          '100%',
          undefined,
          100,
          undefined,
          undefined,
          'password'
        ),
      ]),
    ]),
  ]);
}

/**
 * https://angular.io/api/forms/FormGroup
 */
export function FormSubmit(service: CommonService, input: any): void {
  const value: any = input.form;
  const payload: AuthCredentials = new AuthCredentials(value.username, value.password);
  service.dispatch(new AuthLoginStart(payload));
}
