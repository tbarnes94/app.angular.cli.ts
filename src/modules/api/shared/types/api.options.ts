/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
export class ApiOptions
{
  public constructor(
    public readonly root : string ,
    public readonly login : any ,
  ) {}

}
