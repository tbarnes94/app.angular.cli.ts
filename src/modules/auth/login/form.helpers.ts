import { Validators } from '@angular/forms';

import { CommonService } from '../../commons';
import { AuthLoginStart } from '../shared/store/auth.actions';
import { AuthCredentials } from '../shared/types/auth.credentials';

/**
 * https://angular.io/api/forms/FormGroup
 */
export function FormBuild(o: any): any {
  const t: any = o.translations;
  return {
    actions: [ {
      key: 'complete',
      label: t.submit,
      element: 'button',
      color: 'primary',
      disabled: (o.loader),
      type: 'submit',
    } ],
    sections: [ {
      key: 'form',
      children: [ {
        key: 'username',
        label: t.username.label,
        error: t.username.error,
        width: '50%',
        children: [ {
          key: 'one',
          element: 'input',
          validators: [ Validators.required ],
          maxlength: 100,
          type: 'text',
          width: '100%'
        } ]
      }, {
        key: 'password',
        label: t.password.label,
        error: t.password.error,
        width: '50%',
        children: [ {
          key: 'one',
          element: 'input',
          validators: [ Validators.required ],
          maxlength: 100,
          type: 'password',
          width: '100%'
        } ]
      } ]
    } ]
  };
}

/**
 * https://angular.io/api/forms/FormGroup
 */
export function FormSubmit(service: CommonService, input: any): void {
  const value: any = input.form;
  const payload: AuthCredentials = new AuthCredentials(value.username, value.password);
  service.dispatch(new AuthLoginStart(payload));
}
