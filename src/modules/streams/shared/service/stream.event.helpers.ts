/** @imports */
import { Subject } from 'rxjs/Rx' ;

/**
 * @param input
 * @param event
 */
export function onEvent(
  input : Subject<Event> ,
  event : MessageEvent | ErrorEvent | CloseEvent | Event ,
)
: void
{
  switch ( event.type ) {
    case 'error' :
      input.next( event ) ;
      // input.error( event ) ;
      break ;
    case 'complete' :
    case 'close' :
      input.next( event ) ;
      input.complete() ;
      break ;
    default :
      input.next( event ) ;
      break ;
  }

}

/**
 * @param event
 */
export function onNext( event : Event ) : void
{
  return ;
}
