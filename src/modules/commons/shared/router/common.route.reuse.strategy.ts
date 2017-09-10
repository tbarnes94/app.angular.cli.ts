import { ActivatedRouteSnapshot } from '@angular/router';
import { DetachedRouteHandle } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';

import { isNotNullOrUndefined } from '../helpers/common.helpers';

/**
 * https://angular.io/api/router/RouteReuseStrategy
 */
export class CommonRouteReuseStrategy implements RouteReuseStrategy {

  /**
   * https://angular.io/api/router/RouteReuseStrategy#store
   */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#retrieve
   */
  public retrieve<T extends DetachedRouteHandle>(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#shouldReuseRoute
   */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return ( this.hasComponent(future) && this.hasReuse(future) ) ? future.data.reuse : this.isEqual(future, curr);
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#shouldAttach
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.hasHandler(route);
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#shouldDetach
   */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.hasDetach(route);
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#isEqual
   */
  public isEqual(a: ActivatedRouteSnapshot, b: ActivatedRouteSnapshot): boolean {
    return ( a.routeConfig === b.routeConfig );
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#hasComponent
   */
  public hasComponent(route: ActivatedRouteSnapshot): boolean {
    return ( !!route.component && !!( route.component as any ).name );
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#hasHandler
   */
  public hasHandler(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#hasReuse
   */
  public hasReuse(route: ActivatedRouteSnapshot): boolean {
    return ( !!route.data && isNotNullOrUndefined(route.data.reuse) );
  }

  /**
   * https://angular.io/api/router/RouteReuseStrategy#hasDetach
   */
  public hasDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

}
