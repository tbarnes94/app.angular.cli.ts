import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { ApiError } from '../../../api/shared/types/api.error';
import { ApiService } from '../../../api/shared/service/api.service';
import { CommonService } from '../service/common.service';
import { CommonAction } from './common.action';

/**
 * https://angular.io/api/core/Injectable
 * https://github.com/ngrx/effects
 */
@Injectable()
export class CommonEffects {

  /**
   * @param r
   * @param ErrorAction
   * @returns CommonAction
   */
  public exception(r: ApiError, ErrorAction: any): CommonAction<any> {
    return ( r && r.error && r.error.message )
      ? new ErrorAction(r.error.message)
      : new ErrorAction('Error')
      ;
  }

  /**
   * Constructor
   * @param actions$    https://github.com/ngrx/effects/blob/master/docs/intro.md
   * @param common      https://angular.io/tutorial/toh-pt4
   * @param api         https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly actions$: Actions<CommonAction<any>>,
                     protected readonly common: CommonService,
                     protected readonly api: ApiService) {
  }

}
