import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { FormSchemas } from '../../../modules/forms';
import { TemplateContainerComponent } from '../../../modules/template';
import { FormBuild } from './form.helpers';
import { FormSubmit } from './form.helpers';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'auth-login',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <template-basic
      *ngIf='( this.translations$ | async ) as translations'
      [error]='( this.error$ | async )'
      [loads]='( this.loader$ | async )'
      [title]='translations.title'
      [divider]='false'
      >
      <div class='template-content' >
        <forms-basic
          *ngIf='( this.schemas$ | async ) as schemas'
          [schemas]='schemas'
          (onCompleteEvent)='this.onComplete($event)'
          (onClickEvent)='this.onClick($event)'
          >
        </forms-basic>
      </div>
    </template-basic>
  `,
})
export class AuthLoginComponent extends TemplateContainerComponent {

  /**
   * https://angular.io/api/forms/FormGroup
   */
  public schemas$: Observable<FormSchemas>;

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onComplete(input: any): void {
    return FormSubmit(this.common, input);
  }

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {
    this.key$.next('auth.login');
    this.schemas$ = this.forms.build$(
        this.language$,
        this.translations$,
        Observable.of(false),
        undefined,
        undefined,
        FormBuild,
      )
      .takeUntil(this.destroy$)
      ;
  }

}
