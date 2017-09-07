import { MissingTranslationHandler } from '@ngx-translate/core';
import { MissingTranslationHandlerParams } from '@ngx-translate/core';

/**
 * https://github.com/ngx-translate/core
 */
export class TranslateMissingHandler implements MissingTranslationHandler {
  public handle(param: MissingTranslationHandlerParams): string {
    return param.key.replace(/(.+?\.)/gi, '');
  }
}