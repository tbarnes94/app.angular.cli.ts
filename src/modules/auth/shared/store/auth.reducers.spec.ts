import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { AuthToken } from '../types/auth.token';
import { AuthError } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { AuthLogout } from './auth.actions';
import { AuthActions } from './auth.actions';
import { authErrorReducer } from './auth.reducers';
import { authLoaderReducer } from './auth.reducers';
import { authTokenReducer } from './auth.reducers';
import { authReducers as Reducers } from './auth.reducers';

describe('<Auth>', () => {

  let outpt: any;
  let state: any;
  let action: any;
  const value: string = 'kuwas';

  describe('authReducers', () => {
    it('should return response', fakeAsync(() => {
      state = Reducers({}, { type: null, payload: null });
    }));
  });

  describe('authErrorReducer', () => {

    it('should return response', fakeAsync(() => {
      state = authErrorReducer(null, { type: null, payload: null });
      expect(state).toBeNull();
    }));

    it('should return response for error', fakeAsync(() => {
      action = new AuthError(value);
      state = authErrorReducer(undefined, action);
      expect(state).toEqual(value);
    }));

  });

  describe('authLoaderReducer', () => {

    it('should return response', fakeAsync(() => {
      state = authLoaderReducer(null, { type: null, payload: null });
      expect(state).toBeNull();
    }));

    it('should return response for loader', fakeAsync(() => {
      action = new AuthLoader(true);
      state = authLoaderReducer(undefined, action);
      expect(state).toBeTruthy();
    }));

  });

  describe('authTokenReducer', () => {

    it('should return response', fakeAsync(() => {
      state = authTokenReducer(null, { type: null, payload: null });
      expect(state).toBeNull();
    }));

    it('should return response for login complete', fakeAsync(() => {
      outpt = new AuthToken('Bearer', value, 1);
      action = new AuthLoginComplete(outpt);
      state = authTokenReducer(undefined, action);
      expect(state.token_type).toEqual('Bearer');
      expect(state.access_token).toEqual(value);
      expect(state.expires_in).toEqual(1);
    }));

    it('should return response for logout', fakeAsync(() => {
      action = new AuthLogout(null);
      state = authTokenReducer(undefined, action);
      expect(state).toBeNull();
    }));

  });

});
