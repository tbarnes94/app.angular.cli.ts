import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { CommonComponent } from '@kuwas/angular';
import { StoreEvent } from '@kuwas/angular';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'template-basic',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <!-- section -->
    <section
      role='region'
      >
      <mat-card>
        <!-- title -->
        <mat-card-title
          *ngIf='( this.title )'
          >
          <header>{{ this.title }}</header>
        </mat-card-title>
        <!-- subtitle -->
        <mat-card-subtitle
          *ngIf='( this.subtitle )'
          >
          <span>{{ this.subtitle }}</span>
        </mat-card-subtitle>
        <!-- menus -->
        <mat-card-content>
          <ng-content select='.template-menus' ></ng-content>
        </mat-card-content>
        <!-- divider -->
        <hr
          *ngIf='( this.divider )'
          aria-hidden='true'
          role='separator'
          />
        <!-- content -->
        <ng-container
          *ngIf='( !this.loads )'
          >
          <!-- content event -->
          <template-event
            [event]='( this.event )'
            [modules]='( this.modules )'
            >
          </template-event>
          <!-- content loads -->
          <ng-container>
            <ng-content select='.template-content-loads' ></ng-content>
          </ng-container>
        </ng-container>
        <!-- content statics -->
        <ng-container>
          <ng-content select='.template-content' ></ng-content>
        </ng-container>
        <!-- actions -->
        <mat-card-actions
          *ngIf='( this.actions )'
          >
          <nav role='navigation' >{{ this.actions }}</nav>
        </mat-card-actions>
        <!-- footer -->
        <mat-card-footer
          *ngIf='( this.footer )'
          >
          <footer>{{ this.footer }}</footer>
        </mat-card-footer>
        <!-- loads -->
        <template-loads
          [key]='"section"'
          [loads]='( this.loads )'
          [modules]='( this.modules )'
          [style]='"spinner"'
          >
        </template-loads>
      </mat-card>
    </section>
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
  @Input() public readonly event: StoreEvent = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly modules: any = {};

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
