/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export class AuthCredentials {
  public constructor(public readonly username: string,
                     public readonly password: string) {}
}
