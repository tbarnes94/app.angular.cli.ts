/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'forms-section' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './section.component.styl' ] ,
  template :
  `
    <!-- title -->
    <p
      *ngIf='( this.title )'
      >
      {{ this.title }}
    </p>
    <!-- subtitle -->
    <p
      *ngIf='( this.subtitle )'
      >
      {{ this.subtitle }}
    </p>
    <!-- divider -->
    <hr *ngIf='( this.divider )' />
    <!-- content -->
    <div class='mat-form-groups' >
      <ng-content></ng-content>
    </div>
  ` ,
})
export class FormsSectionComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly title : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly subtitle : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly divider : boolean = false ;

}
