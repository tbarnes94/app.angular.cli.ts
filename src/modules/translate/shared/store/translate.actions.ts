/** @imports */
import { CommonAction } from '../../../commons' ;
import { ObjectAny } from '../../../commons' ;

/**
 * https://github.com/ngrx/platform
 */
const PREFIX : string = '<Translate>' ;
export const TRANSLATE_LANGUAGE : string = `${PREFIX}.language` ;
export const TRANSLATE_TRANSLATIONS : string = `${PREFIX}.translations` ;

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
export class TranslateTranslations extends CommonAction<ObjectAny>
{
  public readonly type : string = TRANSLATE_TRANSLATIONS ;
}

/**
 * https://github.com/ngrx/platform
 */
export type TranslateActions
  = TranslateLanguage
  | TranslateTranslations
  ;
