/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export class AuthToken {
  public constructor(public readonly tokenType: string,
                     public readonly access_token: string,
                     public readonly expires_in: number) {
  }
}
