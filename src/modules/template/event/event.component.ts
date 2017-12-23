/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { StoreEvent } from '../../commons' ;
import { ObjectAny } from '../../helpers' ;

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
        ( this.event.type === "error" )
      )'
      class='mat-error-section'
      >
      <mat-icon>error</mat-icon>
      <span [innerHTML]=
        '
          ( this.modules.event[ this.event.message ] )
          ? this.modules.event[ this.event.message ]
          : this.event.message
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
