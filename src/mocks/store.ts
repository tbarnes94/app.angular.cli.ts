import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

import { CommonAction } from '../modules/commons';

/**
 * https://github.com/ngrx/store
 */
export class MocksStore<T> {

  public readonly state$: Subject<T> = new Subject<T>();
  public readonly actions$: Subject<CommonAction<T>> = new Subject<CommonAction<T>>();

  public select(...input: Array<string>): Observable<T> {
    return this.state$.asObservable();
  }

  public dispatch(input: CommonAction<T>): this {
    this.actions$.next(input);
    return this;
  }

  public constructor() {
    this.actions$
      .subscribe((o) => this.state$.next(o.payload))
    ;
  }

}
