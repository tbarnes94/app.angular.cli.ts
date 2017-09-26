/** @imports */
import { NgModule } from '@angular/core' ;
import { ModuleWithProviders } from '@angular/core' ;
import { RouteReuseStrategy } from '@angular/router' ;
import { EffectsModule } from '@ngrx/effects' ;
import { StoreModule } from '@ngrx/store' ;

import { CommonComponent } from './common/common.component' ;
import { CommonGuard } from './shared/guard/common.guard' ;
import { CommonPipe } from './shared/pipes/common.pipe' ;
import { CommonPreloadStrategy } from './shared/router/common.preload.strategy' ;
import { CommonRouteReuseStrategy } from './shared/router/common.route.reuse.strategy' ;
import { CommonService } from './shared/service/common.service' ;
import { CommonReducers } from './shared/store/common.reducers' ;

/**
 * https://angular.io/api/core/NgModule
 */
@NgModule
({
  imports :
  [
    EffectsModule.forFeature([]) ,
    StoreModule.forFeature( 'common' , CommonReducers ) ,
  ] ,
})
export class CommonRootModule {}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule
({
  imports : [] ,
  declarations :
  [
    CommonComponent ,
    CommonPipe ,
  ] ,
  exports :
  [
    CommonComponent ,
    CommonPipe ,
  ] ,

})
export class CommonModule
{
  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot() : ModuleWithProviders
  {
    return {
      ngModule : CommonRootModule ,
      providers :
      [
        CommonGuard ,
        CommonPreloadStrategy ,
        { provide : RouteReuseStrategy , useClass : CommonRouteReuseStrategy } ,
        CommonService ,
      ] ,
    } ;
  }

}
