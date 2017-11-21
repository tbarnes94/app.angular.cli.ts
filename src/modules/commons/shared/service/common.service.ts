/** @imports */
import { Location } from '@angular/common' ;
import { Injectable } from '@angular/core' ;
import { NavigationCancel } from '@angular/router' ;
import { NavigationEnd } from '@angular/router' ;
import { NavigationError } from '@angular/router' ;
import { NavigationExtras } from '@angular/router' ;
import { NavigationStart } from '@angular/router' ;
import { Router } from '@angular/router' ;
import { Store } from '@ngrx/store' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

import { CommonAction } from '../store/common.action' ;
import { CommonLoads } from '../store/common.actions' ;
import { State } from '../types/state' ;

/**
 * https://angular.io/api/core/Injectable
 */
@Injectable()
export class CommonService
{
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
   */
  public delay : number ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly width$ : BehaviorSubject<number> =
    new BehaviorSubject<number>( window.innerWidth )
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly resizes$ : Observable<number> = Observable
    .fromEvent( window , 'resize' )
    .debounceTime( 100 )
    .map( ( o : Event ) => ( o.target as any ).innerWidth )
    .distinctUntilChanged()
    ;

  /**
   * @returns this
   */
  public totop() : this
  {
    document.body.scrollTop =
    document.documentElement.scrollTop = 0 ;
    return this ;
  }

  /**
   * @returns this
   */
  public backs() : this
  {
    this.location.back() ;
    return this ;
  }

  /**
   * @param input
   * @param options
   * @returns this
   */
  public redirect( input : Array<string> , options : NavigationExtras = {} ) : this
  {
    this.router.navigate( input , options ) ;
    return this ;
  }

  /**
   * @param input
   * @param delay
   * @returns this
   */
  public loads( input : boolean , delay : number = 0 ) : this
  {
    if ( delay > 0 ) {
      clearTimeout( this.delay ) ;
      this.delay = setTimeout( this.loads.bind( this , input ) , delay ) ;
    } else {
      this.dispatch( new CommonLoads( input ) ) ;
    }

    return this ;

  }

  /**
   * @param input
   * @returns this
   */
  public dispatch<T>( input : CommonAction<T> ) : this
  {
    this.store.dispatch( input ) ;
    return this ;
  }

  /**
   * @param nodes
   * @param filters
   * @param context
   * @returns http://reactivex.io/documentation/observable.html
   */
  public select<T>(
    nodes : Array<string> ,
    filters : Observable<Array<Function>> | Array<Function> = new Array() ,
    context : Object = this ,
  )
  : Observable<T>
  {
    let select$ : Observable<any> ;
    const filters$ : Observable<Array<Function>> = ( filters instanceof Array )
      ? Observable.of( filters )
      : filters
      ;

    if ( nodes.length === 1 ) {
      select$ = this.store.select( nodes[0] ) ;
    } else if ( nodes.length === 2 ) {
      select$ = this.store.select( nodes[0] , nodes[1] ) ;
    } else if ( nodes.length === 3 ) {
      select$ = this.store.select( nodes[0] , nodes[1] , nodes[2] ) ;
    } else if ( nodes.length === 4 ) {
      select$ = this.store.select( nodes[0] , nodes[1] , nodes[2] , nodes[3] ) ;
    } else if ( nodes.length === 5 ) {
      select$ = this.store.select( nodes[0] , nodes[1] , nodes[2] , nodes[3] , nodes[4] ) ;
    } else {
      select$ = Observable.of( null ) ;
    }

    return Observable
      .combineLatest( select$ , filters$ )
      .map( ( o ) => ({ store : o[ 0 ] , filters : o[ 1 ] }) )
      .switchMap( ( o : { store : any , filters : Array<Function> } ) =>
      {
        return o.filters.reduce
          (
            ( t , c ) => t.filter( c.bind( context ) ) ,
            Observable.of( o.store ) ,
          )
          ;
      })
      ;

  }

  /**
   * Constructor
   * @param router    https://angular.io/api/router/Router
   * @param location  https://angular.io/api/common/Location
   * @param store     https://github.com/ngrx/platform
   */
  public constructor(
    protected readonly router : Router ,
    protected readonly location : Location ,
    protected readonly store : Store<State> ,
  ) {
    this.router.events
      .filter( ( o ) => ( o instanceof NavigationEnd || o instanceof NavigationCancel ||  o instanceof NavigationError ) )
      .subscribe( ( o ) => this.loads( false , 500 ) )
      ;

    this.router.events
      .filter( ( o ) => ( o instanceof NavigationStart ) )
      .subscribe( ( o ) => this.loads( true ) )
      ;

    this.resizes$
      .subscribe( ( o ) => this.width$.next( o ) )
      ;

  }

}
