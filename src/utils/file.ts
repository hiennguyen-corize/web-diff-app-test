export const convertFileToArrayBuffer = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const byteArray = new Int8Array(buffer);
  return byteArray;
};

export const convertResponseToBlob = async (response: Response) => {
  return await response.blob();
};
