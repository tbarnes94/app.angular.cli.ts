import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { AuthCredentials } from '../../types/auth.credentials';
import { AuthToken } from '../../types/auth.token';
import { AUTH_ERROR } from '../auth.actions';
import { AuthError } from '../auth.actions';
import { AUTH_LOADER } from '../auth.actions';
import { AuthLoader } from '../auth.actions';
import { AUTH_LOGIN_START } from '../auth.actions';
import { AuthLoginStart } from '../auth.actions';
import { AUTH_LOGIN_COMPLETE } from '../auth.actions';
import { AuthLoginComplete } from '../auth.actions';
import { AUTH_LOGOUT } from '../auth.actions';
import { AuthLogout } from '../auth.actions';
import { AuthActions } from '../auth.actions';

describe('<Auth>', () => {

  let outpt: any;
  let action: AuthActions;
  const value: string = 'kuwas';

  describe('AuthError', () => {
    it('should return response', fakeAsync(() => {
      action = new AuthError(value);
      expect(action.type).toEqual(AUTH_ERROR);
      expect(action.payload).toEqual(value);
    }));
  });

  describe('AuthLoader', () => {
    it('should return response', fakeAsync(() => {
      action = new AuthLoader(true);
      expect(action.type).toEqual(AUTH_LOADER);
      expect(action.payload).toBeTruthy();
    }));
  });

  describe('AuthLoginStart', () => {
    it('should return response', fakeAsync(() => {
      outpt = new AuthCredentials(value, value);
      action = new AuthLoginStart(outpt);
      expect(action.type).toEqual(AUTH_LOGIN_START);
      expect(action.payload.username).toEqual(value);
      expect(action.payload.password).toEqual(value);
    }));
  });

  describe('AuthLoginComplete', () => {
    it('should return response', fakeAsync(() => {
      outpt = new AuthToken('Bearer', value, 1);
      action = new AuthLoginComplete(outpt);
      expect(action.type).toEqual(AUTH_LOGIN_COMPLETE);
      expect(action.payload.token_type).toEqual('Bearer');
      expect(action.payload.access_token).toEqual(value);
      expect(action.payload.expires_in).toEqual(1);
    }));
  });

  describe('AuthLogout', () => {
    it('should return response', fakeAsync(() => {
      action = new AuthLogout(null);
      expect(action.type).toEqual(AUTH_LOGOUT);
      expect(action.payload).toBeNull();
    }));
  });

});
