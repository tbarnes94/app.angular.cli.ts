import { tick } from '@angular/core/testing';

/** @exports */
export function CommonPipeTest<C, R>(Pipe: any, current: C, results: any, ...options: Array<any>): void {
  const pipe: any = new Pipe(null);
  const outpt: string = pipe.transform(current, ...options);
  expect(outpt).toEqual(results);
}
