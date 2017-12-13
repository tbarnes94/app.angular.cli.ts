import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../../section/auth/shared/service/auth.service';
import { CommonContainerComponent } from '../../commons/container/container.component';
import { CommonService } from '../../commons/shared/service/common.service';
import { FormService } from '../../forms/shared/service/form.service';
import { ObjectAny } from '../../helpers/shared/types/object.any';
import { ServerEventService } from '../../streams/shared/service/server.event.service';
import { WebWorkerService } from '../../streams/shared/service/web.worker.service';
import { TableService } from '../../table/shared/service/table.service';
import { TranslateService } from '../../translate/shared/service/translate.service';

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
  public readonly modules$: Observable<any> = this.translate.modules$
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly section$: Observable<any> = this.translate.section$
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly language$: Observable<string> = this.translate.language$
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly key$: BehaviorSubject<string> = new BehaviorSubject<string>('common');

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly keys$: Observable<Array<string>> = this.key$
    .map((o) => o.split('.'))
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly error$: Observable<string> = this.keys$
    .switchMap((o) => this.common.select<string>([ o[ 0 ], 'error' ]))
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly loader$: Observable<boolean> = this.keys$
    .switchMap((o) => this.common.select<boolean>([ o[ 0 ], 'loader' ]))
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly translations$: Observable<ObjectAny> = Observable
    .combineLatest(this.key$, this.section$)
    .map((o) => ({ key: o[ 0 ], translations: o[ 1 ] }))
    .filter((o) => ( !!o.translations ))
    .map((o) => this.translate.traverse(o.translations, o.key))
    .takeUntil(this.destroy$)
  ;

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
   * @param route         https://angular.io/api/router/ActivatedRoute
   * @param common        https://angular.io/tutorial/toh-pt4
   * @param serverevent   https://angular.io/tutorial/toh-pt4
   * @param webworker     https://angular.io/tutorial/toh-pt4
   * @param translate     https://angular.io/tutorial/toh-pt4
   * @param auth          https://angular.io/tutorial/toh-pt4
   * @param forms         https://angular.io/tutorial/toh-pt4
   * @param table         https://angular.io/tutorial/toh-pt4
   * @param http          https://angular.io/api/common/http/HttpClient
   */
  public constructor(protected readonly route: ActivatedRoute,
                     protected readonly common: CommonService,
                     protected readonly serverevent: ServerEventService,
                     protected readonly webworker: WebWorkerService,
                     protected readonly translate: TranslateService,
                     protected readonly auth: AuthService,
                     protected readonly forms: FormService,
                     protected readonly table: TableService,
                     protected readonly http: HttpClient) {
    super(route, common);
  }

}
