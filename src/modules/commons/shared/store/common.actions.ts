import { CommonAction } from './common.action';

/**
 * https://github.com/ngrx/platform
 */
const PREFIX: string = '<Common>';
export const COMMON_LOADER: string = `${PREFIX}.loader`;

/**
 * https://github.com/ngrx/platform
 */
export class CommonLoader extends CommonAction<boolean> {
  public readonly type: string = COMMON_LOADER;
}

/**
 * https://github.com/ngrx/platform
 */
export type CommonActions
  = CommonLoader
  ;
