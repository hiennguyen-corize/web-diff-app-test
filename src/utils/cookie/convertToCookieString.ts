export const convertToCookieString = (cookiesObject: object) => {
  const cookieString = Object.entries(cookiesObject)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  return cookieString;
};
