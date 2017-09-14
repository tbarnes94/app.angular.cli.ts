import { ModuleWithProviders } from '@angular/core';

import { CommonModule as Module } from '../common.module';
import { CommonRootModule as RootModule } from '../common.module';
import { CommonSuite } from './common.tests';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonModule';

CommonSuite(title, subtitle, '', () => {
  const outpt: Module = new Module();
  const roots: RootModule = new RootModule();
});

CommonSuite(title, subtitle, 'for forRoot()', () => {
  const outpt: ModuleWithProviders = Module.forRoot();
  expect(outpt.providers.length).toEqual(4);
});
