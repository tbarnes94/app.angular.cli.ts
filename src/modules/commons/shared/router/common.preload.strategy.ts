import { PreloadAllModules } from '@angular/router';
import { PreloadingStrategy } from '@angular/router';
import { Route } from '@angular/router';
import { Observable } from 'rxjs/Rx';

/**
 * https://angular.io/api/router/PreloadingStrategy
 */
export class CommonPreloadStrategy implements PreloadingStrategy {

  /**
   * https://angular.io/guide/router#preloading-background-loading-of-feature-areas
   */
  public preload(route: Route, loads: Function): Observable<null> {
    return ( route.data && route.data.preload )
      ? loads()
      : Observable.of(null)
      ;
  }

}
