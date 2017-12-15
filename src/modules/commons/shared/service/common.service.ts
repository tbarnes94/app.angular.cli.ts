/** @imports */
import { Location } from '@angular/common' ;
import { Injectable } from '@angular/core' ;
import { NavigationCancel } from '@angular/router' ;
import { NavigationEnd } from '@angular/router' ;
import { NavigationError } from '@angular/router' ;
import { NavigationExtras } from '@angular/router' ;
import { NavigationStart } from '@angular/router' ;
import { Router } from '@angular/router' ;
import { Action } from '@ngrx/store' ;
import { Store } from '@ngrx/store' ;
import { isNull } from 'lodash-es' ;
import { isUndefined } from 'lodash-es' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

import { ObjectAny } from '../../../helpers' ;
import { isExpired } from '../../../helpers' ;
import { CommonAction } from '../store/common.action' ;
import { CommonLoads } from '../store/common.actions' ;
import { StoreCache } from '../types/store.cache' ;
import { StoreOperator } from '../types/store.operator' ;
import { StoreState } from '../types/store.state' ;

/**
 * https://angular.io/api/core/Injectable
 */
@Injectable()
export class CommonService
{
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
   */
  public delay : any ;

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
    document.body.focus() ;
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
  public dispatch< T extends Action = Action >( input : T ) : this
  {
    this.store.dispatch<T>( input ) ;
    return this ;
  }

  /**
   * @param cache
   * @param input
   * @returns this
   */
  public cache< R , A extends Action = Action >( cache : StoreCache<A> , input : any /* R */ ) : this
  {
    return (
        ( !!cache ) &&
        (
          ( isNull( input ) || isUndefined( input ) ) ||
          ( !!input.timestamp && isExpired( new Date( input.timestamp ) , cache.expires ) )
        )
      )
      ? this.dispatch<A>( cache.refresh )
      : this
      ;
  }

  /**
   * @param operators
   * @param input
   * @returns http://reactivex.io/documentation/observable.html
   */
  public operator<R>( operators : Array<StoreOperator> , input : R ) : any // x Observable<R>
  {
    return operators.reduce
      (
        ( total , current ) =>
        {
          return ( !!current.process )
            ? total[ current.key ]( current.process.bind( current.context ) )
            : total[ current.key ]( ...current.param )
            ;
        } ,
        Observable.of( input ) ,
      ) ;
  }

  /**
   * @param nodes
   * @param operators
   * @param cache
   * @returns http://reactivex.io/documentation/observable.html
   */
  public select< R , A extends Action = Action >(
    nodes : Array<string> ,
    operators : Array<StoreOperator> = new Array() ,
    cache : StoreCache<A> = null ,
  )
  : Observable<R>
  {
    let store$ : any ;
    if ( nodes.length === 1 ) {
      store$ = this.store.select( nodes[ 0 ] ) ;
    } else if ( nodes.length === 2 ) {
      store$ = this.store.select( nodes[ 0 ] , nodes[ 1 ] ) ;
    } else if ( nodes.length === 3 ) {
      store$ = this.store.select( nodes[ 0 ] , nodes[ 1 ] , nodes[ 2 ] ) ;
    } else if ( nodes.length === 4 ) {
      store$ = this.store.select( nodes[ 0 ] , nodes[ 1 ] , nodes[ 2 ] , nodes[ 3 ] ) ;
    } else if ( nodes.length === 5 ) {
      store$ = this.store.select( nodes[ 0 ] , nodes[ 1 ] , nodes[ 2 ] , nodes[ 3 ] , nodes[ 4 ] ) ;
    } else {
      store$ = Observable.of( null ) ;
    }

    store$.take( 1 )
      .subscribe( this.cache.bind( this , cache ) )
      ;

    return store$
      .switchMap( this.operator.bind( this , operators ) )
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
    protected readonly store : Store<StoreState> ,
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
