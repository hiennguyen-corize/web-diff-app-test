type CookieObjectType = {
  [key: string]: string | undefined;
};

/** Convert key value object */
export function parseCookieString(cookieString: string) {
  if (!cookieString) {
    return null;
  }

  const cookieObj: CookieObjectType = {};
  const cookiePairs = cookieString.split(';');

  cookiePairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    const trimmedKey = key?.trim();
    const trimmedValue = value?.trim();

    if (!!trimmedKey) {
      cookieObj[trimmedKey] = trimmedValue;
    }
  });

  return cookieObj;
}
