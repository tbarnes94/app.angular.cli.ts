import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { ApiService } from '../../../api';
import { CommonService } from '../service/common.service';
import { CommonAction } from './common.action';

/**
 * https://github.com/ngrx/effects
 */
@Injectable()
export class CommonEffects {

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
