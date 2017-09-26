/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
export class TranslateOptions
{
  public constructor(
    public readonly asset : string ,
    public readonly extension : string ,
    public readonly start : string ,
  ) {}

}
