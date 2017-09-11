import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

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
   * @param e
   * @param ErrorAction
   * @returns CommonAction
   */
  public exception(e: { message?: string }, ErrorAction: any): CommonAction<any> {
    return ( e && e.message )
      ? new ErrorAction(e.message)
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
