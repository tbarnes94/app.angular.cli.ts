import { CommonAction } from './common.action';

/**
 * https://github.com/ngrx/store
 */
const PREFIX: string = '<Common>';
export const COMMON_LOADER: string = `${PREFIX}.loader`;

/**
 * https://github.com/ngrx/store
 */
export class CommonLoader extends CommonAction<boolean> {
  public readonly type: string = COMMON_LOADER;
}

/**
 * https://github.com/ngrx/store
 */
export type CommonActions
  = CommonLoader
  ;
