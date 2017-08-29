import { Http } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * https://github.com/ngx-translate/http-loader
 */
export function TranslateLoaderFactory(http: Http): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18ns/', '.json');
}
