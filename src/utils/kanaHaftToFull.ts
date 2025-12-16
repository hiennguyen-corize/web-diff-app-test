export const kanaHaftToFull = (str?: string) => {
  if (!str) {
    return '';
  }

  return str.normalize('NFKC');
};
