import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommonComponent } from '../../commons';
import { ObjectStrings } from '../../commons';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'forms-group',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [ './group.component.styl' ],
  template: `
    <!-- label -->
    <label
      *ngIf='( this.label )'
      [for]='( this.id )'
      >
      <span
        [innerHtml]='this.label'
        >
      </span>
      <!-- tooltip -->
      <i
        *ngIf='( this.tooltip )'
        [matTooltip]='this.tooltip'
        [matTooltipPosition]='"above"'
        aria-hidden='true'
        class='fa fa-question-circle'
        >
      </i>
    </label>
    <!-- control -->
    <div
      [fxLayout]='"row"'
      [fxLayout.lt-md]='"column"'
      class='mat-form-controls'
      >
      <ng-content></ng-content>
    </div>
    <!-- error -->
    <mat-error *ngIf=
      '(
        ( this.error ) &&
        ( !this.model.pristine || this.check ) &&
        ( this.model.invalid )
      )'
      >
      <!-- validation -->
      <div
        *ngIf='( this.model.errors ) as errors'
        >
        <div *ngFor='let type of this.types' >
          <ng-container *ngIf='( this.error[ type ] && errors[ type ] )' >
            {{ this.error[ type ] }}
          </ng-container>
        </div>
      </div>
      <!-- default -->
      <div
        *ngIf='( this.error.required && !this.model.errors )'
        >
        {{ this.error.required }}
      </div>
    </mat-error>
  `,
})
export class FormsGroupComponent extends CommonComponent {

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly model: FormGroup = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly id: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly label: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly tooltip: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly error: ObjectStrings = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly check: boolean = false;

  /**
   * @param
   */
  public readonly types: Array<string> = [
    'required',
    'isFalse',
    'isValid',
  ];

}
