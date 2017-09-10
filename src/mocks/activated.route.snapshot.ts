import { Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Data } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Params } from '@angular/router';
import { Route } from '@angular/router';
import { UrlSegment } from '@angular/router';

/**
 * https://angular.io/api/router/Router
 */
export class MocksActivatedRouteSnapshot implements ActivatedRouteSnapshot {

  public data: Data;
  public component: Type<any> | string | null | any;
  public fragment: string;
  public outlet: string;
  public params: Params;
  public queryParams: Params;
  public url: Array<UrlSegment>;
  public readonly root: ActivatedRouteSnapshot;
  public readonly children: Array<ActivatedRouteSnapshot>;
  public readonly firstChild: ActivatedRouteSnapshot | null;
  public readonly paramMap: ParamMap;
  public readonly parent: ActivatedRouteSnapshot | null;
  public readonly pathFromRoot: Array<ActivatedRouteSnapshot>;
  public readonly queryParamMap: ParamMap;

  public toString(): string {
    return null;
  }

  public constructor(public readonly routeConfig: Route | null,) {
    this.toString();
  }

}
