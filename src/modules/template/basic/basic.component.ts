import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { ObjectAny } from '../../commons';

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
        *ngIf='( this.translations.title )'
        >
        {{ this.translations.title }}
      </mat-card-title>
      <!-- subtitle -->
      <mat-card-subtitle
        *ngIf='( this.translations.subtitle )'
        >
        {{ this.translations.subtitle }}
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
      <!-- contact -->
      <ng-container
        *ngIf='!this.loads'
        >
        <!-- contact error -->
        <div
          *ngIf='this.error'
          class='mat-error-section'
          >
          <mat-icon>error</mat-icon>
          <span [innerHTML]=
            '
              ( this.translations.error && this.translations.error[ this.error ] )
                ? this.translations.error[ this.error ]
                : this.error
            '
            >
          </span>
        </div>
        <!-- contact loads -->
        <ng-content
          select='.template-content-loads'
          >
        </ng-content>
      </ng-container>
      <!-- contact statics -->
      <ng-content
        select='.template-content'
        >
      </ng-content>
      <!-- actions -->
      <!--
      <mat-card-actions
        *ngIf='( this.translations.actions )'
        >
        {{ this.translations.actions }}
      </mat-card-actions>
      -->
      <!-- footer -->
      <!--
      <mat-card-footer
        *ngIf='( this.translations.footer )'
        >
        {{ this.translations.footer }}
      </mat-card-footer>
      -->
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
export class TemplateBasicComponent {

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
  @Input() public readonly translations: ObjectAny = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly divider: boolean = false;

}
