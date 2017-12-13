/** @imports */
import { Subject } from 'rxjs/Rx' ;

/**
 * @param event
 */
export function onNext( event : Event ) : void
{
  return ;
}

/**
 * @param input
 */
export function onOpen( input : Subject<Event> ) : void
{
  return ;
}

/**
 * @param input
 * @param event
 */
export function onError( input : Subject<Event> , event : ErrorEvent ) : void
{
  // return input.error( event ) ;
  return input.next( event ) ;
}

/**
 * @param input
 * @param event
 */
export function onMessage( input : Subject<Event> , event : MessageEvent ) : void
{
  return ( event.data === 'COMPLETE' )
    ? input.complete()
    : input.next( event )
    ;
}
