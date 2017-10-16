import { ApiResponse } from '../../../api';
import { CommonAction } from '../../../commons';
import { AuthCredentials } from '../types/auth.credentials';
import { AuthToken } from '../types/auth.token';

/**
 * https://github.com/ngrx/platform
 */
const PREFIX: string = '<Auth>';
export const AUTH_ERROR: string = `${PREFIX}.error`;
export const AUTH_LOADER: string = `${PREFIX}.loader`;
export const AUTH_LOGIN_START: string = `${PREFIX}.login.start`;
export const AUTH_LOGIN_COMPLETE: string = `${PREFIX}.login.complete`;
export const AUTH_LOGOUT: string = `${PREFIX}.logout`;

/**
 * https://github.com/ngrx/platform
 */
export class AuthError extends CommonAction<string> {
  public readonly type: string = AUTH_ERROR;
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
  = AuthError
  | AuthLoader
  | AuthLoginStart
  | AuthLoginComplete
  | AuthLogout
  ;
