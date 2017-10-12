/** @imports */
import { Injectable } from '@angular/core' ;
import { DateAdapter } from '@angular/material' ;
import { NativeDateAdapter } from '@angular/material' ;
import { Title } from '@angular/platform-browser' ;
import { LangChangeEvent } from '@ngx-translate/core' ;
import { TranslateService as TranslateServiceExternal } from '@ngx-translate/core' ;
import { Observable } from 'rxjs/Rx' ;

import { CommonService } from '../../../commons' ;
import { TranslateLanguage } from '../store/translate.actions' ;
import { TranslateTranslations } from '../store/translate.actions' ;
import { TranslateOptions } from '../types/translate.options' ;

/**
 * https://angular.io/api/core/Injectable
 */
@Injectable()
export class TranslateService
{
  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly language$ : Observable<string> =
    this.common.select<string>([ 'translate' , 'language' ])
    ;

  /**
   * @param o   https://github.com/ngx-translate/core#properties
   */
  public onLanguageEvent( o : string ) : void
  {
    this.dates.setLocale( o ) ;
    this.translate.use( o ) ;
  }

  /**
   * @param o   https://github.com/ngx-translate/core#properties
   */
  public onLanguageEmpty() : void
  {
    this.common.dispatch( new TranslateLanguage( this.options.start ) ) ;
  }

  /**
   * @param e   https://github.com/ngx-translate/core#properties
   */
  public onTranslationsEvent( e : LangChangeEvent ) : void
  {
    this.common.dispatch( new TranslateTranslations( e.translations ) ) ;
    this.title.setTitle( e.translations.app.roots.title ) ;
  }

  /**
   * Constructor
   * @param options     https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   * @param translate   https://github.com/ngx-translate/core
   * @param common      https://angular.io/tutorial/toh-pt4
   * @param dates       https://github.com/angular/material2/blob/master/src/lib/core/datetime/date-adapter.ts
   * @param title       https://angular.io/api/platform-browser/Title
   */
  public constructor(
    protected readonly options : TranslateOptions ,
    protected readonly translate : TranslateServiceExternal ,
    protected readonly common : CommonService ,
    protected readonly dates : DateAdapter<NativeDateAdapter> ,
    protected readonly title : Title ,
  ) {
    this.language$.filter( ( o ) => ( !o ) ).subscribe( this.onLanguageEmpty.bind( this ) ) ;
    this.language$.filter( ( o ) => ( !!o ) ).subscribe( this.onLanguageEvent.bind( this ) ) ;
    // this.translate.onDefaultLangChange.subscribe( this.onTranslationsEvent.bind( this ) ) ;
    this.translate.onLangChange.subscribe( this.onTranslationsEvent.bind( this ) ) ;
  }

}
