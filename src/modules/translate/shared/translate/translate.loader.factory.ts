/** @imports */
import { HttpClient } from '@angular/common/http' ;
import { TranslateHttpLoader } from '@ngx-translate/http-loader' ;

import { TranslateOptions } from '../types/translate.options' ;

/**
 * https://github.com/ngx-translate/http-loader
 */
export function TranslateLoaderFactory( options : TranslateOptions , http : HttpClient ) : TranslateHttpLoader
{
  return new TranslateHttpLoader( http , options.asset , options.extension ) ;
}
