import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { DetachedRouteHandle } from '@angular/router';

import { MocksActivatedRouteSnapshot } from '../../../../mocks/activated.route.snapshot';
import { CommonRouteReuseStrategy as Reuse } from './common.route.reuse.strategy';

/** @tests */
describe('<Common>', () => {

  /** @param */
  let service: Reuse;
  let outpt: DetachedRouteHandle | boolean;
  const value: string = 'kuwas';

  let route: MocksActivatedRouteSnapshot;
  let compare: MocksActivatedRouteSnapshot;

  /** @before */
  beforeEach(() => {
    service = new Reuse();
    route = new MocksActivatedRouteSnapshot(null);
    compare = new MocksActivatedRouteSnapshot(null);
  });

  /** @cases */
  describe('CommonRouteReuseStrategy', () => {

    it('should return response for store()', fakeAsync(() => {
      service.store(route, null);
    }));

    it('should return response for retrieve()', fakeAsync(() => {
      outpt = service.retrieve<DetachedRouteHandle>(route);
      expect(outpt).toBeNull();
    }));

    it('should return response for shouldReuseRoute() with hasReuse() true', fakeAsync(() => {
      route.data = { reuse: true };
      route.component = { name: value };
      outpt = service.shouldReuseRoute(route, compare);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for shouldReuseRoute() with hasReuse() false', fakeAsync(() => {
      route.data = { reuse: false };
      route.component = { name: value };
      outpt = service.shouldReuseRoute(route, compare);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for shouldReuseRoute() with isEqual() true', fakeAsync(() => {
      outpt = service.shouldReuseRoute(route, compare);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for shouldReuseRoute() with isEqual() false', fakeAsync(() => {
      route = new MocksActivatedRouteSnapshot({ data: {} });
      outpt = service.shouldReuseRoute(route, compare);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for shouldAttach()', fakeAsync(() => {
      outpt = service.shouldAttach(route);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for shouldDetach()', fakeAsync(() => {
      outpt = service.shouldDetach(route);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for isEqual() with true', fakeAsync(() => {
      outpt = service.isEqual(route, compare);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for isEqual() with false', fakeAsync(() => {
      route = new MocksActivatedRouteSnapshot({ data: {} });
      outpt = service.isEqual(route, compare);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for hasDetach()', fakeAsync(() => {
      outpt = service.hasDetach(route);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for hasComponent() with true', fakeAsync(() => {
      route.component = { name: value };
      outpt = service.hasComponent(route);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for hasComponent() with false', fakeAsync(() => {
      outpt = service.hasComponent(route);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for hasReuse() with true', fakeAsync(() => {
      route.data = { reuse: true };
      outpt = service.hasReuse(route);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for hasReuse() with false', fakeAsync(() => {
      outpt = service.hasReuse(route);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for hasHandler()', fakeAsync(() => {
      outpt = service.hasHandler(route);
      expect(outpt).toBeFalsy();
    }));

  });

});
