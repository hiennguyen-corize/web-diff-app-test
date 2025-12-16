import db from '@/configs/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getAddOnsStorageTime = async (customerId: string) => {
  const addOnsStorageTimesRef = collection(
    db,
    `/customersBuyAddOns/${customerId}/storageTime`
  );

  const snapshot = await getDocs(addOnsStorageTimesRef);

  const totalStorageTime = snapshot.docs.reduce(
    (acc, doc) => acc + doc.data().storageTime,
    0
  );

  return {
    message: 'Get addOnsStorageTimes success',
    data: totalStorageTime,
  };
};

export const getAddOnsScreenshotSlots = async (customerId: string) => {
  const addOnsScreenshotSlotsRef = collection(
    db,
    `/customersBuyAddOns/${customerId}/screenshots`
  );

  const snapshot = await getDocs(addOnsScreenshotSlotsRef);

  const addOnsScreenshotSlots = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      screenshots: data.screenshots as number,
      used: data.used as number,
    };
  });

  const filteredAddOnsScreenshotSlots = addOnsScreenshotSlots.filter(
    ({ screenshots, used }) => used < screenshots
  );

  const totalScreenshotSlots = filteredAddOnsScreenshotSlots.reduce(
    (acc, { screenshots, used }) => ({
      screenshots: acc.screenshots + screenshots,
      used: acc.used + used,
    }),
    { screenshots: 0, used: 0 }
  );

  return {
    message: 'Get totalScreenshotSlots success',
    data: totalScreenshotSlots,
  };
};
