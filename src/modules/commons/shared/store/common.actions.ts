/** @imports */
import { CommonAction } from './common.action' ;

/**
 * https://github.com/ngrx/platform
 */
const PREFIX : string = '<Common>' ;
export const COMMON_RESET : string = `${PREFIX}.reset` ;
export const COMMON_LOADS : string = `${PREFIX}.loads` ;
export const COMMON_ERROR : string = `${PREFIX}.error` ;
export const COMMON_COMPLETE : string = `${PREFIX}.complete` ;

/**
 * https://github.com/ngrx/platform
 */
export class CommonReset extends CommonAction<null>
{
  public readonly type : string = COMMON_RESET ;
}

/**
 * https://github.com/ngrx/platform
 */
export class CommonLoads extends CommonAction<boolean>
{
  public readonly type : string = COMMON_LOADS ;
}

/**
 * https://github.com/ngrx/platform
 */
export class CommonError extends CommonAction<string>
{
  public readonly type : string = COMMON_ERROR ;
}

/**
 * https://github.com/ngrx/platform
 */
export class CommonComplete extends CommonAction<any>
{
  public readonly type : string = COMMON_COMPLETE ;
}

/**
 * https://github.com/ngrx/platform
 */
export type CommonActions
  = CommonReset
  | CommonLoads
  | CommonError
  | CommonComplete
  ;
