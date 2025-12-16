import Cookies, { CookieAttributes } from 'js-cookie';
import { Cookie } from './constants';

const domain = '';

/**
 * Cookie setter
 * @param cookie - cookie constants
 * @param value - cookie value
 * @param options - cookie options
 */
export function setCookie(
  cookie: Cookie,
  value: string | object,
  options?: Pick<CookieAttributes, 'expires'>
) {
  if (typeof value === 'string') {
    Cookies.set(cookie.name, value, { domain, ...cookie.options, ...options });
  } else {
    Cookies.set(cookie.name, JSON.stringify(value), {
      domain,
      ...cookie.options,
      ...options,
    });
  }
}

/**
 * Cookie getter
 * @param cookie - cookie constants
 * @returns cookie value
 */
export function getCookie(cookie: Cookie) {
  return Cookies.get(cookie.name);
}

/**
 * Cookie remove
 * @param cookie - cookie constants
 */
export function removeCookie(cookie: Cookie) {
  Cookies.remove(cookie.name);
}
