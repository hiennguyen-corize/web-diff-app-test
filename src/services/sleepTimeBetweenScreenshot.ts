import db from '@/configs/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const sleepTimeBetweenScreenshot = async (
  sleepTimeBetweenScreenshot: number,
  projectId: string
) => {
  const projectRef = doc(db, `/projects/${projectId}`);
  await updateDoc(projectRef, { sleepTimeBetweenScreenshot });

  return {
    message: `Sleep time between screenshot updated to ${sleepTimeBetweenScreenshot} seconds.`,
  };
};
