import { CommonAction } from '../../../commons';
import { ObjectAny } from '../../../commons';

/**
 * https://github.com/ngrx/store
 */
const PREFIX: string = '<Translate>';
export const TRANSLATE_LANGUAGE: string = `${PREFIX}.language`;
export const TRANSLATE_TRANSLATIONS: string = `${PREFIX}.translations`;

/**
 * https://github.com/ngrx/store
 */
export class TranslateLanguage extends CommonAction<string> {
  public readonly type: string = TRANSLATE_LANGUAGE;
}

export class TranslateTranslations extends CommonAction<ObjectAny> {
  public readonly type: string = TRANSLATE_TRANSLATIONS;
}

/**
 * https://github.com/ngrx/store
 */
export type TranslateActions
  = TranslateLanguage
  | TranslateTranslations
  ;
