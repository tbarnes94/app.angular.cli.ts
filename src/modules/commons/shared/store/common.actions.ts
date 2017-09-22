import { CommonAction } from './common.action';

/**
 * https://github.com/ngrx/platform
 */
const PREFIX: string = '<Common>';
export const COMMON_ERROR: string = `${PREFIX}.error`;
export const COMMON_LOADER: string = `${PREFIX}.loader`;
export const COMMON_COMPLETE: string = `${PREFIX}.complete`;

/**
 * https://github.com/ngrx/platform
 */
export class CommonError extends CommonAction<string> {
  public readonly type: string = COMMON_ERROR;
}

/**
 * https://github.com/ngrx/platform
 */
export class CommonLoader extends CommonAction<boolean> {
  public readonly type: string = COMMON_LOADER;
}

/**
 * https://github.com/ngrx/platform
 */
export class CommonComplete extends CommonAction<any> {
  public readonly type: string = COMMON_COMPLETE;
}

/**
 * https://github.com/ngrx/platform
 */
export type CommonActions
  = CommonError
  | CommonLoader
  | CommonComplete
  ;
