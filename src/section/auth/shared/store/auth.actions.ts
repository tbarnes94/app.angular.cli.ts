import { ApiResponse } from '../../../../modules/api';
import { CommonAction } from '../../../../modules/commons';
import { StoreEvent } from '../../../../modules/commons';
import { AuthCredentials } from '../types/auth.credentials';
import { AuthToken } from '../types/auth.token';

/**
 * https://github.com/ngrx/platform
 */
const PREFIX: string = '<Auth>';
export const AUTH_EVENT: string = `${PREFIX}.event`;
export const AUTH_LOADER: string = `${PREFIX}.loader`;
export const AUTH_LOGIN_START: string = `${PREFIX}.login.start`;
export const AUTH_LOGIN_COMPLETE: string = `${PREFIX}.login.complete`;
export const AUTH_LOGOUT: string = `${PREFIX}.logout`;

/**
 * https://github.com/ngrx/platform
 */
export class AuthEvent extends CommonAction<StoreEvent> {
  public readonly type: string = AUTH_EVENT;
}

/**
 * https://github.com/ngrx/platform
 */
export class AuthLoader extends CommonAction<boolean> {
  public readonly type: string = AUTH_LOADER;
}

/**
 * https://github.com/ngrx/platform
 */
export class AuthLoginStart extends CommonAction<AuthCredentials> {
  public readonly type: string = AUTH_LOGIN_START;
}

/**
 * https://github.com/ngrx/platform
 */
export class AuthLoginComplete extends CommonAction<ApiResponse<AuthToken>> {
  public readonly type: string = AUTH_LOGIN_COMPLETE;
}

/**
 * https://github.com/ngrx/platform
 */
export class AuthLogout extends CommonAction<null> {
  public readonly type: string = AUTH_LOGOUT;
}

/**
 * https://github.com/ngrx/platform
 */
export type AuthActions
  = AuthEvent
  | AuthLoader
  | AuthLoginStart
  | AuthLoginComplete
  | AuthLogout
  ;
