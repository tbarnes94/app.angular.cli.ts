import { Subject } from 'rxjs/Rx';

/**
 * https://angular.io/api/router/Router
 */
export class MocksRouter<T> {

  public readonly events: Subject<T> = new Subject<T>();
  public readonly routes: Subject<Array<string>> = new Subject<Array<string>>();

  public navigate(input: Array<string>): this {
    this.routes.next(input);
    return this;
  }

  public dispatch(input: T): this {
    this.events.next(input);
    return this;
  }

}
