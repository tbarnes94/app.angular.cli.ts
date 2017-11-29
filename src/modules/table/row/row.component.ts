/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { TableControl } from '../shared/types/basic/table.schemas' ;
import { TableRow } from '../shared/types/row/table.row' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : '[table-row]' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './row.component.styl' ] ,
  host :
  {
    '[class.table-row-head]' : '( this.type === "head" )' ,
    '[class.table-row-click]' : '( this.type === "body-click" )' ,
    '[class.table-row-even]' : 'this.even' ,
    '[class.table-row-odd]' : 'this.odd' ,
  } ,
  template :
  `
    <ng-container
      *ngFor='let cell of this.schemas.children'
      >
      <!-- th -->
      <th
        *ngIf='( this.type === "head" )'
        [schemas]='cell'
        [width]='cell.width'
        [type]='"head"'
        table-cell
        >
      </th>
      <!-- td -->
      <td
        *ngIf=
        '(
          this.type === "body" ||
          this.type === "body-click"
        )'
        [schemas]='cell'
        [type]='"body"'
        table-cell
        >
      </td>
    </ng-container>
  ` ,
})
export class TableRowComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : TableRow<TableControl> = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly even : boolean = false ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly odd : boolean = false ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly type : string = 'body' ;

}
