import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { commonReducer } from '../../../commons';
import { ObjectAny } from '../../../commons';
import { TRANSLATE_LANGUAGE } from './translate.actions';
import { TranslateLanguage } from './translate.actions';
import { TRANSLATE_TRANSLATIONS } from './translate.actions';
import { TranslateTranslations } from './translate.actions';
import { TranslateActions } from './translate.actions';

/**
 * https://github.com/ngrx/platform
 */
export const translateLanguageReducer: ActionReducer<string, TranslateLanguage> = commonReducer<string, TranslateLanguage>(TRANSLATE_LANGUAGE, 'en-US');

/**
 * https://github.com/ngrx/platform
 */
export const translateTranslationsReducer: ActionReducer<ObjectAny, TranslateTranslations> = commonReducer<ObjectAny, TranslateTranslations>(TRANSLATE_TRANSLATIONS, null);

/**
 * https://github.com/ngrx/platform
 */
export function translateReducers(state: any, action: TranslateActions): any {
  return combineReducers({
    language: translateLanguageReducer,
    translations: translateTranslationsReducer,
  })(state, action);
}
