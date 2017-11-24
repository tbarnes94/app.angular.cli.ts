/** @imports */
import { CommonModule } from '@angular/common' ;
import { NgModule } from '@angular/core' ;
import { ModuleWithProviders } from '@angular/core' ;
import { FlexLayoutModule } from '@angular/flex-layout' ;
import { FormsModule } from '@angular/forms' ;
import { ReactiveFormsModule } from '@angular/forms' ;
import { MatButtonModule } from '@angular/material' ;
import { MatCheckboxModule } from '@angular/material' ;
import { MatDatepickerModule } from '@angular/material' ;
import { MatInputModule } from '@angular/material' ;
import { MatRadioModule } from '@angular/material' ;
import { MatSelectModule } from '@angular/material' ;
import { MatTooltipModule } from '@angular/material' ;
import { RouterModule } from '@angular/router' ;

import { CommonModule as CommonModuleExternal } from '../commons' ;
import { FormsBasicComponent } from './basic/basic.component' ;
import { FormsGroupComponent } from './group/group.component' ;
import { FormsSectionComponent } from './section/section.component' ;
import { FormService } from './shared/service/form.service' ;

/**
 * https://angular.io/api/core/NgModule
 */
@NgModule
({
  imports : [] ,
})
export class FormRootModule {}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule
({
  imports :
  [
    CommonModule ,
    CommonModuleExternal ,
    FlexLayoutModule ,
    FormsModule ,
    ReactiveFormsModule ,
    MatButtonModule ,
    MatCheckboxModule ,
    MatDatepickerModule ,
    MatInputModule ,
    MatRadioModule ,
    MatSelectModule ,
    MatTooltipModule ,
    RouterModule ,
  ] ,
  declarations :
  [
    FormsBasicComponent ,
    FormsGroupComponent ,
    FormsSectionComponent ,
  ] ,
  exports :
  [
    FormsBasicComponent ,
  ] ,
})
export class FormModule
{
  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot() : ModuleWithProviders
  {
    return {
      ngModule : FormRootModule ,
      providers :
      [
        FormService ,
      ] ,
    } ;
  }

}
