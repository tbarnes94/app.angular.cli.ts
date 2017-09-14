import { tick } from '@angular/core/testing';
import { DetachedRouteHandle } from '@angular/router';

import { MocksActivatedRouteSnapshot } from '../../../../../mocks/activated.route.snapshot';
import { CommonSuite } from '../../../specs/common.tests';
import { CommonRouteReuseStrategy as Reuse } from '../common.route.reuse.strategy';

/** @exports */
let service: Reuse;
let compare: MocksActivatedRouteSnapshot;
let route: MocksActivatedRouteSnapshot;

export function one(): void {
  service = new Reuse();
  compare = new MocksActivatedRouteSnapshot(null);
  route = new MocksActivatedRouteSnapshot(null);
}

const title: string = 'Common';
const subtitle: string = 'CommonRouteReuseStrategy';
let outpt: DetachedRouteHandle | boolean;
const samples: string = 'kuwas';

CommonSuite(
  title,
  subtitle,
  'for store()',
  () => {
    service.store(route, null);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for retrieve()',
  () => {
    outpt = service.retrieve<DetachedRouteHandle>(route);
    expect(outpt).toBeNull();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for shouldReuseRoute() with hasReuse() true',
  () => {
    route.data = { reuse: true };
    route.component = { name: samples };
    outpt = service.shouldReuseRoute(route, compare);
    expect(outpt).toBeTruthy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for shouldReuseRoute() with hasReuse() false',
  () => {
    route.data = { reuse: false };
    route.component = { name: samples };
    outpt = service.shouldReuseRoute(route, compare);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for shouldReuseRoute() with isEqual() true',
  () => {
    outpt = service.shouldReuseRoute(route, compare);
    expect(outpt).toBeTruthy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for shouldReuseRoute() with isEqual() false',
  () => {
    route = new MocksActivatedRouteSnapshot({ data: {} });
    outpt = service.shouldReuseRoute(route, compare);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for shouldAttach()',
  () => {
    outpt = service.shouldAttach(route);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for shouldDetach()',
  () => {
    outpt = service.shouldDetach(route);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for isEqual() with true',
  () => {
    outpt = service.isEqual(route, compare);
    expect(outpt).toBeTruthy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for isEqual() with false',
  () => {
    route = new MocksActivatedRouteSnapshot({ data: {} });
    outpt = service.isEqual(route, compare);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for hasDetach()',
  () => {
    outpt = service.hasDetach(route);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for hasComponent() with true',
  () => {
    route.component = { name: samples };
    outpt = service.hasComponent(route);
    expect(outpt).toBeTruthy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for hasComponent() with false',
  () => {
    outpt = service.hasComponent(route);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for hasReuse() with true',
  () => {
    route.data = { reuse: true };
    outpt = service.hasReuse(route);
    expect(outpt).toBeTruthy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for hasReuse() with false',
  () => {
    outpt = service.hasReuse(route);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for hasHandler()',
  () => {
    outpt = service.hasHandler(route);
    expect(outpt).toBeFalsy();
  },
  one,
);
