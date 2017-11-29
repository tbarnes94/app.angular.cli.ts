/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { TableSchemas } from '../shared/types/basic/table.schemas' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'table-basic' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './basic.component.styl' ] ,
  template :
  `
    <!-- table -->
    <table
      *ngIf='( this.schemas.rows.length > 0 )'
      class='table-basic'
      >
      <!-- thead -->
      <thead>
        <tr
          *ngIf='( this.schemas.columns ) as columns'
          [schemas]='columns'
          [type]='"head"'
          table-row
          >
        </tr>
      </thead>
      <!-- tbody -->
      <tbody>
        <ng-container
          *ngFor='let row of this.schemas.rows ; index as i ;'
          >
          <!-- route -->
          <tr
            *ngIf='( row.route )'
            [schemas]='row'
            [routerLink]='row.route'
            [even]='( i % 2 === 0 )'
            [odd]='( i % 2 === 1 )'
            [type]='"body-click"'
            table-row
            >
          </tr>
          <!-- non-route -->
          <tr
            *ngIf='( !row.route )'
            [schemas]='row'
            [even]='( i % 2 === 0 )'
            [odd]='( i % 2 === 1 )'
            [type]='"body"'
            table-row
            >
          </tr>
        </ng-container>
      </tbody>
      <!-- tfoot -->
      <tfoot>
        <!-- pagination -->
      </tfoot>
    </table>
    <!-- empty -->
    <div
      *ngIf='( this.schemas.rows.length <= 0 )'
      >
      <ng-content
        select='.table-empty'
        >
      </ng-content>
    </div>
  ` ,
})
export class TableBasicComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : TableSchemas = null ;

}
