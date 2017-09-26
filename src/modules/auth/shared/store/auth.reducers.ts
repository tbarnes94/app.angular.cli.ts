import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { CommonReducer } from '../../../commons';
import { AuthToken } from '../types/auth.token';
import { AUTH_ERROR } from './auth.actions';
import { AuthError } from './auth.actions';
import { AUTH_LOADER } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AUTH_LOGIN_COMPLETE } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { AuthActions } from './auth.actions';

/**
 * https://github.com/ngrx/platform
 */
export const authErrorReducer: ActionReducer<string, AuthError> = CommonReducer<string, AuthError>(AUTH_ERROR, null);

/**
 * https://github.com/ngrx/platform
 */
export const authLoaderReducer: ActionReducer<boolean, AuthLoader> = CommonReducer<boolean, AuthLoader>(AUTH_LOADER, false);

/**
 * https://github.com/ngrx/platform
 */
export const authTokenReducer: ActionReducer<AuthToken, AuthLoginComplete> = CommonReducer<AuthToken, AuthLoginComplete>(AUTH_LOGIN_COMPLETE, null);

/**
 * https://github.com/ngrx/platform
 */
export function authReducers(state: any, action: AuthActions): any {
  return combineReducers({
    error: authErrorReducer,
    loader: authLoaderReducer,
    token: authTokenReducer,
  })(state, action);
}
