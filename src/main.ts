import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.app.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(
    AppModule,
    { preserveWhitespaces: false }
  )
  ;
