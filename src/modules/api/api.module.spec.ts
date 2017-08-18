import { ModuleWithProviders } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { ApiModule as Module } from './api.module';
import { ApiRootModule as RootModule } from './api.module';

describe('<Api>', () => {

  let outpt: ModuleWithProviders;
  let module: Module | RootModule;

  describe('ApiModule', () => {

    it('should return response', fakeAsync(() => {
      module = new Module();
    }));

    it('should return response for forRoot()', fakeAsync(() => {
      outpt = Module.forRoot({ root: null });
      expect(outpt.providers.length).toEqual(2);
      module = new RootModule();
    }));

  });

});
