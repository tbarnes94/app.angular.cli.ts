/** @imports */
import { Injectable } from '@angular/core' ;
import { Observable } from 'rxjs/Rx' ;
import { Subject } from 'rxjs/Rx' ;

import { ServerEventStore } from '../types/server.event.store' ;
import { onEvent } from './stream.event.helpers' ;
import { onNext } from './stream.event.helpers' ;

declare var EventSource : any ;

/**
 * https://angular.io/api/core/Injectable
 * https://developer.mozilla.org/en-US/docs/Web/API/EventSource
 */
@Injectable()
export class ServerEventService
{
  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
   */
  protected readonly store : Map< string , ServerEventStore > = new Map< string , ServerEventStore >() ;

  /**
   * @param input
   * @returns http://reactivex.io/documentation/observable.html
   */
  protected toStreams( input : string ) : ServerEventStore
  {
    const uri : string = input ;
    const event : any = new EventSource( uri ) ; // x EventSource
    const close : Subject<boolean> = new Subject<boolean>() ;
    const event$ : Subject<Event> = new Subject<Event>() ;

    event.onopen = onEvent.bind( this , event$ ) ;
    event.onerror = onEvent.bind( this , event$ ) ;
    event.onmessage = onEvent.bind( this , event$ ) ;
    event$.takeUntil( close ).subscribe
    (
      onNext.bind( this ) ,
      this.close.bind( this , input ) ,
      this.close.bind( this , input ) ,
    ) ;

    return new ServerEventStore
    (
      close ,
      event$ ,
      event ,
    ) ;

  }

  /**
   * @param input
   * @returns http://reactivex.io/documentation/observable.html
   */
  public start( input : string ) : Observable<Event>
  {
    return ( !this.store.has( input ) )
      ? this.store.set( input , this.toStreams( input ) ).get( input ).event$
      : this.store.get( input ).event$
      ;
  }

  /**
   * @param input
   * @returns void
   */
  public close( input : string ) : void
  {
    const store : ServerEventStore = this.store.get( input ) ;

    if ( store ) {
      store.event.close() ;
      store.close.next( true ) ;
      store.close.unsubscribe() ;
      this.store.delete( input ) ;
    }

  }

}
