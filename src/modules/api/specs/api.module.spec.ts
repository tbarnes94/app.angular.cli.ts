import { ModuleWithProviders } from '@angular/core';

import { CommonSuite } from '../../commons/specs/common.tests';
import { ApiModule as Module } from '../api.module';
import { ApiRootModule as RootModule } from '../api.module';

/** @exports */
const title: string = 'Api';
const subtitle: string = 'ApiModule';

CommonSuite(title, subtitle, '', () => {
  const outpt: Module = new Module();
  const roots: RootModule = new RootModule();
});

CommonSuite(title, subtitle, 'for forRoot()', () => {
  const outpt: ModuleWithProviders = Module.forRoot({ root: null });
  expect(outpt.providers.length).toEqual(2);
});
