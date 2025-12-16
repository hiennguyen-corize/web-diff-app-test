import { convertResponseToBlob } from './file';

export const getImageFileFromFirebase = async (
  imageUrl: string
): Promise<Blob | undefined> => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const blob = await convertResponseToBlob(response);
    return blob;
  } catch (error) {
    return;
  }
};
