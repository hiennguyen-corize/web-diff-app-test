export const parseJsonKey = (jsonKey?: string): string | undefined => {
  if (!jsonKey) {
    return;
  }

  const { privateKey } = JSON.parse(jsonKey);

  return privateKey;
};
