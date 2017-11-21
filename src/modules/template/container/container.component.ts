import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../auth/shared/service/auth.service';
import { CommonContainerComponent } from '../../commons/container/container.component';
import { CommonService } from '../../commons/shared/service/common.service';
import { ObjectAny } from '../../commons/shared/types/object.any';
import { FormService } from '../../forms/shared/service/form.service';
import { TableService } from '../../table/shared/service/table.service';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'template-container',
  styles: [ `` ],
  template: ``,
})
export class TemplateContainerComponent extends CommonContainerComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public error$: Observable<string> = null;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public loader$: Observable<boolean> = null;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public language$: Observable<string> = this.common
    .select<string>([ 'translate', 'language' ])
    .takeUntil(this.destroy$)
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public translations$: Observable<ObjectAny> = this.common
    .select<ObjectAny>([ 'translate', 'translations' ])
    .takeUntil(this.destroy$)
    ;

  /**
   * @param key
   */
  public streams(key: string = 'common'): void {

    this.error$ = this.common
      .select<string>([ key, 'error' ])
      .takeUntil(this.destroy$)
      ;

    this.loader$ = this.common
      .select<boolean>([ key, 'loader' ])
      .takeUntil(this.destroy$)
      ;

  }

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onClick(input: string): void {
    if (typeof this[ input ] === 'function') {
      this[ input ]();
    }
  }

  /**
   * Constructor
   * @param route     https://angular.io/api/router/ActivatedRoute
   * @param common    https://angular.io/tutorial/toh-pt4
   * @param auth      https://angular.io/tutorial/toh-pt4
   * @param forms     https://angular.io/tutorial/toh-pt4
   * @param table     https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly route: ActivatedRoute,
                     protected readonly common: CommonService,
                     protected readonly auth: AuthService,
                     protected readonly forms: FormService,
                     protected readonly table: TableService) {
    super(route, common);
  }

}
