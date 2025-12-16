type CookieOptions = {
  expires?: number;
  path?: string;
  domain?: string;
};

export class Cookie {
  static ACCESS_TOKEN = new Cookie('accessToken', {
    expires: 30,
  });

  static REFRESH_TOKEN = new Cookie('refreshToken', {
    expires: 365,
  });

  static UUID = new Cookie('uuid');

  static IS_LOCAL_ADMIN = new Cookie('isLocalAdmin');

  private constructor(
    private _name: string,
    private _options: CookieOptions = {}
  ) {}

  get name() {
    return this._name;
  }

  get options() {
    return this._options;
  }
}
