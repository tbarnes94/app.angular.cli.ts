/** @imports */
import { Observable } from 'rxjs/Rx' ;

/**
 * @param input
 * @returns http://reactivex.io/documentation/observable.html
 */
export function error<T>( input : T ) : Observable<T>
{
  return Observable.of( input ) ;
}
