import { ModuleWithProviders } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { CommonModule as Module } from './common.module';
import { CommonRootModule as RootModule } from './common.module';

describe('<Common>', () => {

  let outpt: ModuleWithProviders;
  let module: Module | RootModule;

  describe('CommonModule', () => {

    it('should return response', fakeAsync(() => {
      module = new Module();
    }));

    it('should return response for forRoot()', fakeAsync(() => {
      outpt = Module.forRoot();
      expect(outpt.providers.length).toEqual(4);
      module = new RootModule();
    }));

  });

});
