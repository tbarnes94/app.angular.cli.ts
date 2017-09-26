/** @imports */
import { Component } from '@angular/core' ;

import { AfterContentChecked } from '@angular/core' ;
import { AfterContentInit } from '@angular/core' ;
import { AfterViewChecked } from '@angular/core' ;
import { AfterViewInit } from '@angular/core' ;
import { DoCheck } from '@angular/core' ;
import { OnChanges } from '@angular/core' ;
import { OnDestroy } from '@angular/core' ;
import { OnInit } from '@angular/core' ;

import { ActivatedRoute } from '@angular/router' ;
import { Subject } from 'rxjs/Rx' ;

import { CommonService } from '../shared/service/common.service' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'commons-common' ,
  styles : [ `` ] ,
  template : `` ,
})
export class CommonComponent implements OnChanges ,
                                        OnInit ,
                                        DoCheck ,
                                        AfterContentInit ,
                                        AfterContentChecked ,
                                        AfterViewInit ,
                                        AfterViewChecked ,
                                        OnDestroy
{
  /**
   * https://stackoverflow.com/a/41177163
   */
  public readonly destroy$ : Subject<boolean> = new Subject<boolean>() ;

  /**
   * https://angular.io/api/core/OnChanges
   * https://angular.io/api/core/OnChanges#ngOnChanges
   */
  public ngOnChanges() : void {}

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit() : void {}

  /**
   * https://angular.io/api/core/DoCheck
   * https://angular.io/api/core/DoCheck#ngDoCheck
   */
  public ngDoCheck() : void {}

  /**
   * https://angular.io/api/core/AfterContentInit
   * https://angular.io/api/core/AfterContentInit#ngAfterContentInit
   */
  public ngAfterContentInit() : void {}

  /**
   * https://angular.io/api/core/AfterContentChecked
   * https://angular.io/api/core/AfterContentChecked#ngAfterContentChecked
   */
  public ngAfterContentChecked() : void {}

  /**
   * https://angular.io/api/core/AfterViewInit
   * https://angular.io/api/core/AfterViewInit#ngAfterViewInit
   */
  public ngAfterViewInit() : void {}

  /**
   * https://angular.io/api/core/AfterViewChecked
   * https://angular.io/api/core/AfterViewChecked#ngAfterViewChecked
   */
  public ngAfterViewChecked() : void {}

  /**
   * https://angular.io/api/core/OnDestroy
   * https://angular.io/api/core/OnDestroy#ngOnDestroy
   */
  public ngOnDestroy() : void
  {
    this.destroy$.next( true ) ;
    this.destroy$.unsubscribe() ;
  }

  /**
   * Constructor
   * @param route     https://angular.io/api/router/ActivatedRoute
   * @param common    https://angular.io/tutorial/toh-pt4
   */
  public constructor(
    protected readonly route : ActivatedRoute ,
    protected readonly common : CommonService ,
  ) {}

}
