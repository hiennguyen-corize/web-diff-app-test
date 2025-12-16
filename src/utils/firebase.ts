import {
  CollectionReference,
  DocumentData,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

export const deleteCollection = async (
  ref: CollectionReference<DocumentData, DocumentData>
): Promise<void> => {
  const refSnap = await getDocs(ref);
  const deleteDocRef = refSnap.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deleteDocRef);
};
