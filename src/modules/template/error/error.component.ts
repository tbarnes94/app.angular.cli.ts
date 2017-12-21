import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { CommonComponent } from '../../commons';
import { ObjectAny } from '../../helpers';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'template-error',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <!-- error -->
    <div
      *ngIf='( this.error )'
      class='mat-error-section'
      >
      <mat-icon>error</mat-icon>
      <span [innerHTML]=
        '
          ( this.modules.error[ this.error ] )
          ? this.modules.error[ this.error ]
          : this.error
        '
        role='alert'
        >
      </span>
    </div>
  `,
})
export class TemplateErrorComponent extends CommonComponent {

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly error: boolean = false;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly modules: ObjectAny = {};

}
