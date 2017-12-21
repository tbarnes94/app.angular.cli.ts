/** @imports */
import { Injectable } from '@angular/core' ;

import { CommonEffects } from '../../../commons' ;
import { ObjectStrings } from '../../../helpers' ;

/**
 * https://angular.io/api/core/Injectable
 * https://github.com/ngrx/effects
 */
@Injectable()
export class TemplateCommonEffects extends CommonEffects {

  /**
   * https://angular.io/api/common/http/HttpHeaders
   */
  public headers(h: any = {}): ObjectStrings {

    this.common
      .select<string>([ 'translate', 'language' ])
      .take(1).filter((o) => (!!o))
      .subscribe((o) => h['Accept-Language'] = o)
      ;

    return h;

  }

}
