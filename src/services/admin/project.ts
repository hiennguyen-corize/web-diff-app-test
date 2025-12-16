import db from '@/configs/firebase';
import { AdminDeleteProjectRequest } from '@/models/AdminDeleteProject';
import {
  GetProjectRequestType,
  GetProjectResponseType,
} from '@/models/GetProjectType';
import { AxiosError } from 'axios';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const getProject = async (
  request: GetProjectRequestType
): Promise<GetProjectResponseType> => {
  const { projectId } = request;

  if (!projectId) {
    throw new AxiosError('Missing projectId');
  }

  // const projectRef = doc(db, `/projects/${projectId}`);
  // const pageSnapshotsRef = collection(
  //   db,
  //   `/projects/${projectId}/pageSnapShot`
  // );

  // const [projectSnap, pageSnapshotSnap] = await Promise.all([
  //   getDoc(projectRef),
  //   getDocs(pageSnapshotsRef),
  // ]);

  // const pageSnapShot = pageSnapshotSnap.docs.map((doc) => {
  //   const data = doc.data();
  //   return {
  //     id: doc.id,
  //     url: data.url,
  //     paths: data.paths,
  //     createdAt: data.createdAt,
  //     updateAt: data.updateAt,
  //     status: data.status,
  //   };
  // });

  // const projectData = projectSnap.data();

  // if (!projectData) {
  //   throw new AxiosError('Project data not found');
  // }

  // const project: ProjectType = {
  //   id: projectSnap.id,
  //   name: projectData.name,
  //   userId: projectData.userId,
  //   urlLogin: projectData.urlLogin,
  //   createdAt: projectData.createdAt,
  //   updatedAt: projectData.updateAt,
  //   description: projectData.description,
  //   hasBasicAuth: projectData.hasBasicAuth,
  //   hasPageLogin: projectData.hasPageLogin,
  //   passwordLogin: projectData.passwordLogin,
  //   userNameLogin: projectData.userNameLogin,
  //   passwordBasicAuth: projectData.passwordBasicAuth,
  //   userNameBasicAuth: projectData.userNameBasicAuth,
  // };

  // const responseData = { ...project, pageSnapShot };

  return {
    message: 'Get project list successfully',
    // data: responseData,
  };
};

export const deleteProject = async (request: AdminDeleteProjectRequest) => {
  const { projectId } = request;

  const projectRef = doc(db, `/projects/${projectId}`);
  const pageSnapsRef = collection(db, `/projects/${projectId}/pageSnapShot`);
  const pageSnapsSnap = await getDocs(pageSnapsRef);

  const deleteList = [deleteDoc(projectRef)];

  pageSnapsSnap.docs.forEach((doc) => {
    deleteList.push(deleteDoc(doc.ref));
  });

  await Promise.all(deleteList);
};
