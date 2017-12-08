/** @imports */
import { DOCUMENT } from '@angular/common' ;
import { Inject } from '@angular/core' ;
import { Injectable } from '@angular/core' ;
import { DateAdapter } from '@angular/material' ;
import { NativeDateAdapter } from '@angular/material' ;
import { Title } from '@angular/platform-browser' ;
import { LangChangeEvent } from '@ngx-translate/core' ;
import { TranslateService as TranslateServiceExternal } from '@ngx-translate/core' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

import { CommonService } from '../../../commons' ;
import { ObjectAny } from '../../../commons' ;
import { TranslateLanguage } from '../store/translate.actions' ;
import { TranslateTranslations } from '../store/translate.actions' ;
import { TranslateOptions } from '../types/translate.options' ;
import { TranslateTitle } from '../types/translate.title' ;

/**
 * https://angular.io/api/core/Injectable
 */
@Injectable()
export class TranslateService
{
  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly language$ : Observable<string> = this.common
    .select<string>([ 'translate' , 'language' ])
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly translations$ : Observable<ObjectAny> = this.common
    .select<ObjectAny>([ 'translate' , 'translations' ])
    ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly titles$ : BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]) ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly title$ : Observable<TranslateTitle> = Observable
    .combineLatest( this.titles$ , this.translations$ )
    .map( ( o ) => new TranslateTitle( o[ 0 ] , o[ 1 ] ) )
    .filter( ( o ) => ( !!o.translations ) )
    ;

  /**
   * @param input
   */
  public setTitle( input : Array<string> ) : void
  {
    this.titles$.next( input ) ;
  }

  /**
   * @param o   https://github.com/ngx-translate/core#properties
   */
  public onEmptyEvent() : void
  {
    this.common.dispatch( new TranslateLanguage( this.options.start ) ) ;
  }

  /**
   * @param o   https://github.com/ngx-translate/core#properties
   */
  public onLanguageEvent( o : string ) : void
  {
    const all : string = o ;
    const short : string = all.split( '-' )[ 0 ] ;

    this.dates.setLocale( all ) ;
    this.document.documentElement.lang = short ;
    this.translate.use( all ) ;

  }

  /**
   * @param e   https://github.com/ngx-translate/core#properties
   */
  public onTranslationsEvent( e : LangChangeEvent ) : void
  {
    this.common.dispatch( new TranslateTranslations( e.translations ) ) ;
  }

  /**
   * @param input
   */
  public onTitleEvent( input : TranslateTitle ) : void
  {
    const titles : Array<string> =
      [ 'title.start' , ...input.titles ]
      .map( this.onTitleMap.bind( this , input.translations ) )
      ;

    const title : string = titles.join( input.translations.title.separator ) ;
    this.title.setTitle( title ) ;

  }

  /**
   * @param translations
   * @param input
   */
  public onTitleMap( translations : ObjectAny , input : string ) : string
  {
    return input
      .split( '.' )
      .reduce
      (
        ( total , current ) =>
        {
          return total[ current ]
            ? total[ current ]
            : ( typeof total === 'string' )
              ? total
              : ''
            ;
        } ,
        translations ,
      )
      ;
  }

  /**
   * Constructor
   * @param options     https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   * @param translate   https://github.com/ngx-translate/core
   * @param common      https://angular.io/tutorial/toh-pt4
   * @param dates       https://github.com/angular/material2/blob/master/src/lib/core/datetime/date-adapter.ts
   * @param document    https://angular.io/api/common/DOCUMENT
   * @param title       https://angular.io/api/platform-browser/Title
   */
  public constructor(
    protected readonly options : TranslateOptions ,
    protected readonly translate : TranslateServiceExternal ,
    protected readonly common : CommonService ,
    protected readonly dates : DateAdapter<NativeDateAdapter> ,
    @Inject( DOCUMENT ) protected readonly document : any ,
    protected readonly title : Title ,
  ) {
    this.language$.filter( ( o ) => ( !o ) ).subscribe( this.onEmptyEvent.bind( this ) ) ;
    this.language$.filter( ( o ) => ( !!o ) ).subscribe( this.onLanguageEvent.bind( this ) ) ;
    this.translate.onLangChange.subscribe( this.onTranslationsEvent.bind( this ) ) ;
    // this.translate.onDefaultLangChange.subscribe( this.onTranslationsEvent.bind( this ) ) ;
    this.title$.subscribe( this.onTitleEvent.bind( this ) ) ;
  }

}
