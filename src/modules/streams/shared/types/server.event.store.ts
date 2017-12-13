/** @imports */
import { Subject } from 'rxjs/Rx' ;

/**
 * http://reactivex.io/documentation/observable.html
 * https://developer.mozilla.org/en-US/docs/Web/API/EventSource
 */
export class ServerEventStore
{
  public constructor(
    public readonly close : Subject<boolean> ,
    public readonly event$ : Subject<Event> ,
    public readonly event : any , // x EventSource ,
  ) {}

}
