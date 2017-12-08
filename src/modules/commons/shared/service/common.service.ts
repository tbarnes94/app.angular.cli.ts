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
import { ObjectAny } from '../types/object.any' ;
import { Operator } from '../types/operator' ;
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
  public dispatch<T>( input : CommonAction<T> ) : this
  {
    this.store.dispatch( input ) ;
    return this ;
  }

  /**
   * @param nodes
   * @param operators
   * @param context
   * @returns http://reactivex.io/documentation/observable.html
   */
  public select<T>(
    nodes : Array<string> ,
    operators : Array<Operator> = new Array() ,
    context : Object = this ,
  )
  : Observable<T>
  {
    let store$ : Observable<ObjectAny> = Observable.of( null ) ;
    const operators$ : Observable<Array<Operator>> = Observable.of( operators ) ;

    if ( nodes.length === 1 ) {
      store$ = this.store.select( nodes[0] ) ;
    } else if ( nodes.length === 2 ) {
      store$ = this.store.select( nodes[0] , nodes[1] ) ;
    } else if ( nodes.length === 3 ) {
      store$ = this.store.select( nodes[0] , nodes[1] , nodes[2] ) ;
    } else if ( nodes.length === 4 ) {
      store$ = this.store.select( nodes[0] , nodes[1] , nodes[2] , nodes[3] ) ;
    } else if ( nodes.length === 5 ) {
      store$ = this.store.select( nodes[0] , nodes[1] , nodes[2] , nodes[3] , nodes[4] ) ;
    }

    return Observable
      .combineLatest( store$ , operators$ )
      .map( ( o ) => ({ store : o[ 0 ] , operators : o[ 1 ] }) )
      .switchMap( ( o : { store : ObjectAny , operators : Array<Operator> } ) =>
      {
        return o.operators.reduce
          (
            ( total , current ) => total[ current.key ]( current.run.bind( context ) ) ,
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
