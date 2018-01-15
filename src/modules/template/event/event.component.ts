/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { CommonComponent } from '@kuwas/angular' ;
import { ObjectAny } from '@kuwas/angular' ;
import { StoreEvent } from '@kuwas/angular' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'template-event' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styles : [ `` ] ,
  template :
  `
    <!-- error -->
    <div *ngIf=
      '(
        ( this.event ) &&
        ( this.event.key === "error" )
      )'
      class='mat-error-section'
      >
      <mat-icon>error</mat-icon>
      <span
        *ngFor='let message of this.event.message'
        [innerHTML]=
        '
          ( this.modules.event[ message ] )
          ? this.modules.event[ message ]
          : message
        '
        role='alert'
        >
      </span>
    </div>
  ` ,
})
export class TemplateEventComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly event : StoreEvent = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly modules : ObjectAny = {} ;

}
