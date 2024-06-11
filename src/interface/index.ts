// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/dc1b21c49e5e1456ebcc7a496d63d452e12ff2d2/types/auth0/index.d.ts#L721
export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string | undefined;
  refresh_token?: string | undefined;
}
