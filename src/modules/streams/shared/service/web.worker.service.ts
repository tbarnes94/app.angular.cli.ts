/** @imports */
import { Injectable } from '@angular/core' ;
import { Observable } from 'rxjs/Rx' ;
import { Subject } from 'rxjs/Rx' ;

import { WebWorkerStore } from '../types/web.worker.store' ;
import { onError } from './stream.event.helpers' ;
import { onMessage } from './stream.event.helpers' ;
import { onNext } from './stream.event.helpers' ;

/**
 * https://angular.io/api/core/Injectable
 * https://developer.mozilla.org/en-US/docs/Web/API/Worker
 * https://github.com/haochi/angular2-web-worker
 */
@Injectable()
export class WebWorkerService
{
  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
   */
  protected readonly store : WeakMap< Function , WebWorkerStore > = new WeakMap< Function , WebWorkerStore >() ;

  /**
   * @param input
   * @returns string
   */
  protected toUrl( input : Function ) : string
  {
    const resolve : string = input.toString() ;
    const template : string = `self.onmessage = ( ${resolve} ).bind( this , postMessage ) ;` ;
    const blob : Blob = new Blob( [ template ] , { type : 'text/javascript' } ) ;
    return URL.createObjectURL( blob ) ;
  }

  /**
   * @param input
   * @param input$
   * @returns http://reactivex.io/documentation/observable.html
   */
  protected toStreams( input : Function , input$ : Observable<any> ) : WebWorkerStore
  {
    const url : string = this.toUrl( input ) ;
    const event : Worker = new Worker( url ) ;
    const close : Subject<boolean> = new Subject<boolean>() ;
    const event$ : Subject<Event> = new Subject<Event>() ;

    event.onerror = onError.bind( this , event$ ) ;
    event.onmessage = onMessage.bind( this , event$ ) ;
    input$.takeUntil( close ).subscribe( ( o ) => event.postMessage( o ) ) ;
    event$.takeUntil( close ).subscribe
    (
      onNext.bind( this ) ,
      this.close.bind( this , input ) ,
      this.close.bind( this , input ) ,
    ) ;

    return new WebWorkerStore
    (
      close ,
      event$ ,
      event ,
    ) ;

  }

  /**
   * @param input
   * @param input$
   * @returns http://reactivex.io/documentation/observable.html
   */
  public start( input : Function , input$ : Observable<any> ) : Observable<Event>
  {
    return ( !this.store.has( input ) )
      ? this.store.set( input , this.toStreams( input , input$ ) ).get( input ).event$
      : this.store.get( input ).event$
      ;
  }

  /**
   * @param input
   * @returns void
   */
  public close( input : Function ) : void
  {
    const store : WebWorkerStore = this.store.get( input ) ;

    if ( store ) {
      store.event.terminate() ;
      store.close.next( true ) ;
      store.close.unsubscribe() ;
      this.store.delete( input ) ;
    }

  }

}
