/** @imports */
import { CommonAction } from '../../../commons' ;
import { ObjectAny } from '../../../helpers' ;

/**
 * https://github.com/ngrx/platform
 */
const PREFIX : string = '<Translate>' ;
export const TRANSLATE_LANGUAGE : string = `${PREFIX}.language` ;
export const TRANSLATE_MODULES : string = `${PREFIX}.modules` ;
export const TRANSLATE_SECTION : string = `${PREFIX}.section` ;

/**
 * https://github.com/ngrx/platform
 */
export class TranslateLanguage extends CommonAction<string>
{
  public readonly type : string = TRANSLATE_LANGUAGE ;
}

/**
 * https://github.com/ngrx/platform
 */
export class TranslateModules extends CommonAction<ObjectAny>
{
  public readonly type : string = TRANSLATE_MODULES ;
}

/**
 * https://github.com/ngrx/platform
 */
export class TranslateSection extends CommonAction<ObjectAny>
{
  public readonly type : string = TRANSLATE_SECTION ;
}

/**
 * https://github.com/ngrx/platform
 */
export type TranslateActions
  = TranslateLanguage
  | TranslateModules
  | TranslateSection
  ;
