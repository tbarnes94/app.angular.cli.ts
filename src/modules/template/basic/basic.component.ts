import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { CommonComponent } from '../../commons';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'template-basic',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <mat-card>
      <!-- title -->
      <mat-card-title
        *ngIf='( this.title )'
        >
        {{ this.title }}
      </mat-card-title>
      <!-- subtitle -->
      <mat-card-subtitle
        *ngIf='( this.subtitle )'
        >
        {{ this.subtitle }}
      </mat-card-subtitle>
      <!-- menus -->
      <mat-card-content>
        <ng-content
          select='.template-menus'
          >
        </ng-content>
      </mat-card-content>
      <!-- divider -->
      <hr *ngIf='this.divider' />
      <!-- content -->
      <ng-container *ngIf='!this.loads' >
        <!-- content error -->
        <div
          *ngIf='this.error'
          class='mat-error-section'
          >
          <mat-icon>error</mat-icon>
          <span [innerHTML]=
            '
              ( this.errors[ this.error ] )
              ? this.errors[ this.error ]
              : this.error
            '
            >
          </span>
        </div>
        <!-- content loads -->
        <ng-content
          select='.template-content-loads'
          >
        </ng-content>
      </ng-container>
      <!-- content statics -->
      <ng-content
        select='.template-content'
        >
      </ng-content>
      <!-- actions -->
      <mat-card-actions
        *ngIf='( this.actions )'
        >
        {{ this.actions }}
      </mat-card-actions>
      <!-- footer -->
      <mat-card-footer
        *ngIf='( this.footer )'
        >
        {{ this.footer }}
      </mat-card-footer>
      <!-- loads -->
      <div
        *ngIf='this.loads'
        fxLayout='row'
        fxLayoutAlign='center center'
        class='loads'
        >
        <mat-spinner></mat-spinner>
      </div>
    </mat-card>
  `,
})
export class TemplateBasicComponent extends CommonComponent {

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly loads: boolean = false;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly error: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly errors: any = {};

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly divider: boolean = false;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly title: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly subtitle: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly actions: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly footer: string = null;

}
