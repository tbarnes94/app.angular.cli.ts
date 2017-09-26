/** @imports */
import { ActionReducer } from '@ngrx/store' ;
import { combineReducers } from '@ngrx/store' ;

import { CommonReducer } from '../../../commons' ;
import { ObjectAny } from '../../../commons' ;
import { State } from '../../../commons' ;
import { TRANSLATE_LANGUAGE } from './translate.actions' ;
import { TranslateLanguage } from './translate.actions' ;
import { TRANSLATE_TRANSLATIONS } from './translate.actions' ;
import { TranslateTranslations } from './translate.actions' ;
import { TranslateActions } from './translate.actions' ;

/**
 * https://github.com/ngrx/platform
 */
export const TranslateLanguageReducer : ActionReducer< string , TranslateLanguage > = CommonReducer< string , TranslateLanguage >( TRANSLATE_LANGUAGE , null ) ;

/**
 * https://github.com/ngrx/platform
 */
export const TranslateTranslationsReducer : ActionReducer< ObjectAny , TranslateTranslations > = CommonReducer< ObjectAny , TranslateTranslations >( TRANSLATE_TRANSLATIONS , null ) ;

/**
 * https://github.com/ngrx/platform
 */
export function TranslateReducers( state : any , action : TranslateActions ) : any
{
  return combineReducers
  ({
    language : TranslateLanguageReducer ,
    translations : TranslateTranslationsReducer ,
  })
  ( state , action ) ;

}
