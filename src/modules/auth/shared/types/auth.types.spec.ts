import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { AuthCredentials } from './auth.credentials';
import { AuthToken } from './auth.token';

describe('<Auth>', () => {

  let outpt: AuthCredentials
    | AuthToken
  ;

  describe('AuthTypes', () => {
    it('should return response', fakeAsync(() => {
      outpt = new AuthCredentials(null, null);
      outpt = new AuthToken(null, null, null);
    }));
  });

});
