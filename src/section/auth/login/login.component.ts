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
      [event]='( this.event$ | async )'
      [loads]='( this.loader$ | async )'
      [modules]='( this.modules$ | async )'
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
   * http://reactivex.io/documentation/observable.html
   */
  public schemas$: Observable<FormSchemas> = this.forms.build$(
      this.language$,
      this.translations$,
      this.modules$,
      Observable.of(false),
      undefined,
      undefined,
      FormBuild,
    )
    .takeUntil(this.destroy$)
    ;

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onComplete(input: any): void {
    return FormSubmit(this.common, input);
  }

}
