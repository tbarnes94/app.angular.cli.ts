import { AfterContentChecked } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { DoCheck } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormService } from '@ng2-dynamic-forms/core';
import { Subject } from 'rxjs/Rx';

import { AuthService } from '../../auth/shared/service/auth.service';
import { CommonService } from '../shared/service/common.service';

/**
 * https://angular.io/guide/ngmodule#declare-directives-and-components
 */
@Component({
  selector: 'commons-common',
  styles: [ `` ],
  template: ``,
})
export class CommonComponent implements OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  /**
   * https://stackoverflow.com/a/41177163
   */
  public readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * https://angular.io/api/core/OnChanges
   */
  public ngOnChanges(): void {
  }

  /**
   * https://angular.io/api/core/OnInit
   */
  public ngOnInit(): void {
  }

  /**
   * https://angular.io/api/core/DoCheck
   */
  public ngDoCheck(): void {
  }

  /**
   * https://angular.io/api/core/AfterContentInit
   */
  public ngAfterContentInit(): void {
  }

  /**
   * https://angular.io/api/core/AfterContentChecked
   */
  public ngAfterContentChecked(): void {
  }

  /**
   * https://angular.io/api/core/AfterViewInit
   */
  public ngAfterViewInit(): void {
  }

  /**
   * https://angular.io/api/core/AfterViewChecked
   */
  public ngAfterViewChecked(): void {
  }

  /**
   * https://angular.io/api/core/OnDestroy
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Constructor
   * @param route     https://angular.io/api/router/ActivatedRoute
   * @param common    https://angular.io/tutorial/toh-pt4
   * @param auth      https://angular.io/tutorial/toh-pt4
   * @param forms     https://github.com/udos86/ng2-dynamic-forms
   */
  public constructor(protected readonly route: ActivatedRoute,
                     protected readonly common: CommonService,
                     protected readonly auth: AuthService,
                     protected readonly forms: DynamicFormService) {
  }

}
