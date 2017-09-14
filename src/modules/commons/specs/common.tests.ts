import { fakeAsync } from '@angular/core/testing';

/** @exports */
export function CommonEmpty(): void {
}

/** @exports */
export function CommonSuite(title: string,
                            subtitle: string,
                            description: string,
                            input: Function,
                            one: any = CommonEmpty,
                            two: any = CommonEmpty): void {
  describe(`<${title}>`, () => {
    describe(subtitle, () => {
      beforeEach(one);
      it(`should return response ${description}`, fakeAsync(input));
      afterEach(two);
    });
  });
}
