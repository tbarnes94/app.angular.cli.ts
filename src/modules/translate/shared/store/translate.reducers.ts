/** @imports */
import { ActionReducer } from '@ngrx/store' ;
import { combineReducers } from '@ngrx/store' ;

import { CommonReducer } from '../../../commons' ;
import { ObjectAny } from '../../../helpers' ;
import { State } from '../../../helpers' ;
import { TRANSLATE_LANGUAGE } from './translate.actions' ;
import { TranslateLanguage } from './translate.actions' ;
import { TRANSLATE_MODULES } from './translate.actions' ;
import { TranslateModules } from './translate.actions' ;
import { TRANSLATE_SECTION } from './translate.actions' ;
import { TranslateSection } from './translate.actions' ;
import { TranslateActions } from './translate.actions' ;

/**
 * https://github.com/ngrx/platform
 */
export const TranslateLanguageReducer : ActionReducer< string , TranslateLanguage > = CommonReducer< string , TranslateLanguage >( TRANSLATE_LANGUAGE , null ) ;

/**
 * https://github.com/ngrx/platform
 */
export const TranslateModulesReducer : ActionReducer< ObjectAny , TranslateModules > = CommonReducer< ObjectAny , TranslateModules >( TRANSLATE_MODULES , null ) ;

/**
 * https://github.com/ngrx/platform
 */
export const TranslateSectionReducer : ActionReducer< ObjectAny , TranslateSection > = CommonReducer< ObjectAny , TranslateSection >( TRANSLATE_SECTION , null ) ;

/**
 * https://github.com/ngrx/platform
 */
export function TranslateReducers( state : any , action : TranslateActions ) : any
{
  return combineReducers
  ({
    language : TranslateLanguageReducer ,
    modules : TranslateModulesReducer ,
    section : TranslateSectionReducer ,
  })
  ( state , action ) ;

}
