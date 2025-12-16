declare module 'js-cookie' {
  export interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Lax' | 'Strict' | 'None';
    // Include any additional properties as per your usage or library's documentation
  }

  interface CookiesStatic {
    set(name: string, value: string, options?: CookieAttributes): void;
    get(name: string): string | undefined;
    remove(name: string, options?: CookieAttributes): void;
    // Declare any additional methods you use
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
