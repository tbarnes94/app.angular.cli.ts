import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { clone } from 'lodash';

import { commonReducer } from '../../../commons';
import { AuthToken } from '../types/auth.token';
import { AUTH_ERROR } from './auth.actions';
import { AuthError } from './auth.actions';
import { AUTH_LOADER } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AUTH_LOGIN_COMPLETE } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { AUTH_LOGOUT } from './auth.actions';
import { AuthLogout } from './auth.actions';
import { AuthActions } from './auth.actions';

/**
 * https://github.com/ngrx/store
 */
export const authErrorReducer: ActionReducer<string, AuthError> = commonReducer<string, AuthError>(AUTH_ERROR, null);
export const authLoaderReducer: ActionReducer<boolean, AuthLoader> = commonReducer<boolean, AuthLoader>(AUTH_LOADER, false);

export function authTokenReducer(state: AuthToken = null, action: AuthLoginComplete | AuthLogout): AuthToken {
  if (action.type === AUTH_LOGOUT) {
    return null;
  } else if (action.type === AUTH_LOGIN_COMPLETE) {
    return clone(action.payload);
  }
  return state;
}

/**
 * https://github.com/ngrx/store
 */
export function authReducers(state: any, action: AuthActions): any {
  return combineReducers({
    error: authErrorReducer,
    loader: authLoaderReducer,
    token: authTokenReducer,
  })(state, action);
}
