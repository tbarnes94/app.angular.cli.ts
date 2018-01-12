import { ApiResponse } from '@kuwas/angular';
import { CommonReducer } from '@kuwas/angular';
import { StoreEvent } from '@kuwas/angular';
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { AuthToken } from '../types/auth.token';
import { AUTH_EVENT } from './auth.actions';
import { AuthEvent } from './auth.actions';
import { AUTH_LOADER } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AUTH_LOGIN_COMPLETE } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { AuthActions } from './auth.actions';

/**
 * https://github.com/ngrx/platform
 */
export const authEventReducer: ActionReducer<StoreEvent, AuthEvent> = CommonReducer<AuthEvent, StoreEvent>(AUTH_EVENT, null);

/**
 * https://github.com/ngrx/platform
 */
export const authLoaderReducer: ActionReducer<boolean, AuthLoader> = CommonReducer<AuthLoader, boolean>(AUTH_LOADER, false);

/**
 * https://github.com/ngrx/platform
 */
export const authTokenReducer: ActionReducer<ApiResponse<AuthToken>, AuthLoginComplete> = CommonReducer<AuthLoginComplete, ApiResponse<AuthToken>>(AUTH_LOGIN_COMPLETE, null);

/**
 * https://github.com/ngrx/platform
 */
export function authReducers(state: any, action: AuthActions): any {
  return combineReducers({
    event: authEventReducer,
    loader: authLoaderReducer,
    token: authTokenReducer,
  })(state, action);
}
