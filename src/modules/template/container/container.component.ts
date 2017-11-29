import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../../section/auth/shared/service/auth.service';
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
  public language$: Observable<string> = this.common
    .select<string>([ 'translate', 'language' ])
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public translationz$: Observable<ObjectAny> = this.common
    .select<ObjectAny>([ 'translate', 'translations' ])
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public key$: BehaviorSubject<string> = new BehaviorSubject<string>('common');

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public keys$: Observable<Array<string>> = this.key$
    .map((o) => o.split('.'))
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public error$: Observable<string> = this.keys$
    .switchMap((o) => this.common.select<string>([ o[ 0 ], 'error' ]))
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public loader$: Observable<boolean> = this.keys$
    .switchMap((o) => this.common.select<boolean>([ o[ 0 ], 'loader' ]))
    .takeUntil(this.destroy$)
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public translations$: Observable<ObjectAny> = Observable
    .combineLatest(this.keys$, this.translationz$)
    .map((o) => ({ keys: o[ 0 ], translations: o[ 1 ] }))
    .filter((o) => (!!o.translations))
    .map(this.onTranslationsMap.bind(this))
    .takeUntil(this.destroy$)
  ;

  /**
   * @param input
   * @returns ObjectAny
   */
  public onTranslationsMap(input: ObjectAny): ObjectAny {
    return input.keys.reduce(this.onTranslationsReduce.bind(this), input.translations);
  }

  /**
   * @param total
   * @param key
   * @param index
   * @returns ObjectAny
   */
  public onTranslationsReduce(total: any, key: string, index: number): ObjectAny {
    return total[ key ] ? total[ key ] : {};
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
   * @param http      https://angular.io/api/common/http/HttpClient
   */
  public constructor(protected readonly route: ActivatedRoute,
                     protected readonly common: CommonService,
                     protected readonly auth: AuthService,
                     protected readonly forms: FormService,
                     protected readonly table: TableService,
                     protected readonly http: HttpClient) {
    super(route, common);
  }

}
