/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export class AuthToken {
  public constructor(public readonly token_type: string,
                     public readonly access_token: string,
                     public readonly expires_in: number) {
  }
}
