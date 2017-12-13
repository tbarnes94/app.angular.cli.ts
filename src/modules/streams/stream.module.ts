/** @imports */
import { NgModule } from '@angular/core' ;
import { ModuleWithProviders } from '@angular/core' ;

import { ServerEventService } from './shared/service/server.event.service' ;
import { WebWorkerService } from './shared/service/web.worker.service' ;

/**
 * https://angular.io/api/core/NgModule
 */
@NgModule
({
  imports : [] ,
})
export class StreamRootModule {}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule
({
  imports : [] ,
  declarations : [] ,
  exports : [] ,
})
export class StreamModule
{
  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot() : ModuleWithProviders
  {
    return {
      ngModule : StreamRootModule ,
      providers :
      [
        ServerEventService ,
        WebWorkerService ,
      ] ,
    } ;
  }

}
