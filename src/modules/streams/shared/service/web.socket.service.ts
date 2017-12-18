/** @imports */
import { Injectable } from '@angular/core' ;
import { Observable } from 'rxjs/Rx' ;
import { Subject } from 'rxjs/Rx' ;

import { WebSocketStore } from '../types/web.socket.store' ;
import { onEvent } from './stream.event.helpers' ;
import { onNext } from './stream.event.helpers' ;

/**
 * https://angular.io/api/core/Injectable
 * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 */
@Injectable()
export class WebSocketService
{
  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
   */
  protected readonly store : Map< string , WebSocketStore > = new Map< string , WebSocketStore >() ;

  /**
   * @param input
   * @param input$
   * @returns http://reactivex.io/documentation/observable.html
   */
  protected toStreams( input : string , input$ : Observable<any> ) : WebSocketStore
  {
    const uri : string = input ;
    const event : WebSocket = new WebSocket( uri ) ;
    const close : Subject<boolean> = new Subject<boolean>() ;
    const event$ : Subject<Event> = new Subject<Event>() ;

    event.onopen = onEvent.bind( this , event$ ) ;
    event.onclose = onEvent.bind( this , event$ ) ;
    event.onerror = onEvent.bind( this , event$ ) ;
    event.onmessage = onEvent.bind( this , event$ ) ;
    input$.takeUntil( close ).subscribe( ( o ) => event.send( o ) ) ;
    event$.takeUntil( close ).subscribe
    (
      onNext.bind( this ) ,
      this.close.bind( this , input ) ,
      this.close.bind( this , input ) ,
    ) ;

    return new WebSocketStore
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
  public start( input : string , input$ : Observable<any> ) : Observable<Event>
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
  public close( input : string ) : void
  {
    const store : WebSocketStore = this.store.get( input ) ;

    if ( store ) {
      store.event.close() ;
      store.close.next( true ) ;
      store.close.unsubscribe() ;
      this.store.delete( input ) ;
    }

  }

}
