import db from '@/configs/firebase';
import { BasicAuthRequest, BasicAuthResponse } from '@/models/BasicAuth';
import dayjs from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';

export const createBasicAuth = async (
  projectId: string,
  basicAuth: BasicAuthRequest
): Promise<BasicAuthResponse> => {
  const projectRef = doc(db, `/projects/${projectId}`);

  const newBasicAuth = {
    username: basicAuth.username,
    password: basicAuth.password,
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  };

  await updateDoc(projectRef, {
    basicAuth: newBasicAuth,
  });

  return {
    message: 'Create basic auth success',
    data: newBasicAuth,
  };
};
