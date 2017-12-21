import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { CommonComponent } from '../../commons';
import { ObjectAny } from '../../helpers';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'template-loads',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template:`
    <!-- loads -->
    <div
      fxLayout='row'
      fxLayoutAlign='center center'
      class='loads'
    >
      <!-- template -->
      <ng-container
        *ngIf='( this.loads ) ; then start else complete ;'
      >
      </ng-container>
      <!-- complete -->
      <ng-template #complete>
        <span
          class='mat-aria-txt'
          role='alert'
        >
          {{ this.modules.loads[this.key].complete }}
        </span>
      </ng-template>
      <!-- start -->
      <ng-template #start>
        <!-- spinner -->
        <mat-spinner
          *ngIf='( this.style === "spinner" )'
        >
        </mat-spinner>
        <!-- progress -->
        <mat-progress-bar
          *ngIf='( this.style === "progress" )'
          [mode]='"indeterminate"'
        >
        </mat-progress-bar>
        <!-- texts -->
        <span
          class='mat-aria-txt'
          role='alert'
        >
          {{ this.modules.loads[this.key].start }}
        </span>
      </ng-template>
    </div>
  `,
})
export class TemplateLoadsComponent extends CommonComponent {

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly key: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly loads: boolean = false;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly modules: ObjectAny = {};

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly style: string = null;

}
