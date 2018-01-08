/** @imports */
import { DOCUMENT } from '@angular/common' ;
import { Inject } from '@angular/core' ;
import { Injectable } from '@angular/core' ;
import { DateAdapter } from '@angular/material' ;
import { Title } from '@angular/platform-browser' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

import { Translations } from '../../../../assets/i18ns' ;
import { CommonService } from '../../../commons' ;
import { ObjectAny } from '../../../helpers' ;
import { TranslateLanguage } from '../store/translate.actions' ;
import { TranslateModules } from '../store/translate.actions' ;
import { TranslateSection } from '../store/translate.actions' ;
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
  public readonly modules$ : Observable<any> = this.common
    .select<any>([ 'translate' , 'modules' ])
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly section$ : Observable<any> = this.common
    .select<any>([ 'translate' , 'section' ])
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly language$ : Observable<string> = this.common
    .select<string>([ 'translate' , 'language' ])
    ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly titles$ : BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]) ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly title$ : Observable<TranslateTitle> = Observable
    .combineLatest( this.titles$ , this.modules$ )
    .map( ( o ) => new TranslateTitle( o[ 0 ] , o[ 1 ] ) )
    .filter( ( o ) => ( !!o.translations ) )
    ;

  /**
   * @param input
   */
  public onEmptyEvent() : void
  {
    this.common.dispatch( new TranslateLanguage( this.options.start ) ) ;
  }

  /**
   * @param input
   */
  public onLanguageEvent( input : string ) : void
  {
    const all : string = input ;
    const short : string = all.split( '-' )[ 0 ] ;

    this.dates.setLocale( all ) ;
    this.document.documentElement.lang = short ;
    this.onTranslationsEvent( all ) ;

  }

  /**
   * @param input
   */
  public onTranslationsEvent( input : string ) : void
  {
    const translation : any = Translations[ input ] ;
    this.common.dispatch( new TranslateModules( translation.modules ) ) ;
    this.common.dispatch( new TranslateSection( translation.section ) ) ;
  }

  /**
   * @param input
   */
  public onTitleEvent( input : TranslateTitle ) : void
  {
    const titles : Array<string> =
      [ 'title.start' , ...input.titles ]
      .map( this.traverse.bind( this , input.translations ) )
      ;

    const title : string = titles.join( input.translations.title.separator ) ;
    this.title.setTitle( title ) ;

  }

  /**
   * @param input
   */
  public setTitle( input : Array<string> ) : void
  {
    this.titles$.next( input ) ;
  }

  /**
   * @param translations
   * @param input
   * @returns any
   */
  public traverse( translations : any , input : string ) : any
  {
    return input.split( '.' ).reduce
      (
        ( total , current ) => ( total[ current ] ) ? total[ current ] : total ,
        translations ,
      )
      ;
  }

  /**
   * Constructor
   * @param common      https://angular.io/tutorial/toh-pt4
   * @param options     https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   * @param document    https://angular.io/api/common/DOCUMENT
   * @param dates       https://github.com/angular/material2/blob/master/src/lib/core/datetime/date-adapter.ts
   * @param title       https://angular.io/api/platform-browser/Title
   */
  public constructor(
    protected readonly common : CommonService ,
    protected readonly options : TranslateOptions ,
    @Inject( DOCUMENT ) protected readonly document : any ,
    protected readonly dates : DateAdapter<any> ,
    protected readonly title : Title ,
  ) {
    this.language$.filter( ( o ) => ( !o ) ).subscribe( this.onEmptyEvent.bind( this ) ) ;
    this.language$.filter( ( o ) => ( !!o ) ).subscribe( this.onLanguageEvent.bind( this ) ) ;
    this.title$.subscribe( this.onTitleEvent.bind( this ) ) ;
  }

}
