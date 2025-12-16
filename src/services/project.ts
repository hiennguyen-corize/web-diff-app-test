import db from '@/configs/firebase';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { compact, uniqBy } from 'lodash';

import { AddNewProjectRequest } from '@/models/AddNewProjectType';
import { CreateProjectResponse } from '@/models/CreateProjectType';
import { DeleteProjectResponse } from '@/models/DeleteProjectType';
import { EditProjectResponse } from '@/models/EditProjectType';
import { GetProjectResponseType, ProjectType } from '@/models/GetProjectType';
import {
  GetProjectsRequest,
  GetProjectsResponseType,
} from '@/models/GetProjectsType';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { handleIsProjectBelongToThisUser } from '@/utils/pageSnapshot';
import { AxiosError } from 'axios';
import pLimit from 'p-limit';

const limit = pLimit(20);

export const addProject = async (
  request: AddNewProjectRequest,
  userId: string | undefined
): Promise<CreateProjectResponse> => {
  const { name, description } = request;

  if (!userId) {
    throw new AxiosError('Missing or empty userId');
  }

  if (!name) {
    throw new AxiosError('Missing or empty name');
  }

  const currentDate = new Date().toISOString();

  const newProject = {
    userId,
    name,
    description,
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  const projectsRef = collection(db, '/projects');

  const { id } = await addDoc(projectsRef, newProject);

  const projectRef = doc(db, `/projects/${id}`);

  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new AxiosError('Project not found');
  }

  const projectDetail = projectSnap.data();

  const project: ProjectType = {
    id: projectSnap.id,
    name: projectDetail.name,
    userId: projectDetail.userId,
    basicAuth: projectDetail.basicAuth,
    createdAt: projectDetail.createdAt,
    updatedAt: projectDetail.updatedAt,
    description: projectDetail.description,
    collaborators: projectDetail.collaborators,
    approvedCommitId: projectDetail.approvedCommitId,
  };
  return {
    message: 'Create project success',
    data: project,
  };
};

export const getProjects = async ({
  userId,
  email,
}: GetProjectsRequest): Promise<GetProjectsResponseType> => {
  const projectsCollectionRef = collection(db, '/projects');

  const byUserIdQuery = query(
    projectsCollectionRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const byCollaboratorQuery = query(
    projectsCollectionRef,
    where('collaborators', 'array-contains', email),
    orderBy('createdAt', 'desc')
  );

  const [byUserIdSnap, byCollaboratorSnap] = await Promise.all([
    getDocs(byUserIdQuery),
    getDocs(byCollaboratorQuery),
  ]);

  const projectList: Omit<ProjectType, 'pageSnapshot'>[] = [
    ...byUserIdSnap.docs.map((projectDoc) => {
      const data = projectDoc.data();
      return {
        name: data.name,
        state: data.state,
        userId: data.userId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        basicAuth: data.basicAuth,
        description: data.description,
        collaborators: data.collaborators,
        approvedCommitId: data.approvedCommitId,
        screenshotSchedule: data.screenshotSchedule,
        id: projectDoc.id,
      };
    }),
    ...byCollaboratorSnap.docs.map((projectDoc) => {
      const data = projectDoc.data();
      return {
        name: data.name,
        state: data.state,
        userId: data.userId,
        basicAuth: data.basicAuth,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        description: data.description,
        collaborators: data.collaborators,
        approvedCommitId: data.approvedCommitId,
        id: projectDoc.id,
      };
    }),
  ];

  return {
    message: 'Get List Project Success',
    data: uniqBy(compact(projectList), 'id'),
  };
};

export const deleteProject = async (
  projectId: string,
  userId: string
): Promise<DeleteProjectResponse> => {
  const projectDoc = doc(db, `/projects/${projectId}`);

  await deleteProjectRelatedCommits(projectId, userId);

  await deleteDoc(projectDoc);

  return {
    message: 'Delete project success',
  };
};

const deleteProjectRelatedCommits = async (
  projectId: string,
  userId: string
) => {
  const q = query(
    collection(db, '/visualchecks'),
    where('projectId', '==', projectId),
    where('userId', '==', userId)
  );

  const commitsSnapshot = await getDocs(q);

  if (commitsSnapshot.empty) {
    return {
      message: 'Visual test empty',
    };
  }

  const deletePromises = commitsSnapshot.docs.map((doc) =>
    limit(() => deleteDoc(doc.ref))
  );

  await Promise.all(deletePromises);
};

export const getDetailProject = async (
  projectId: string
): Promise<GetProjectResponseType> => {
  const docRef = doc(db, `/projects/${projectId}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new AxiosError('Project not found');
  }

  const projectDocData = docSnap.data();

  const projectData: ProjectType = {
    id: projectId,
    name: projectDocData.name,
    userId: projectDocData.userId,
    createdAt: projectDocData.createdAt,
    basicAuth: projectDocData.basicAuth,
    description: projectDocData.description,
    pageSnapShot: projectDocData.pageSnapShot,
    collaborators: projectDocData.collaborators,
    slackWebhookURL: projectDocData.slackWebhookURL,
    approvedCommitId: projectDocData.approvedCommitId,
    screenshotSchedule: projectDocData.screenshotSchedule,
    sleepTimeBetweenScreenshot: projectDocData.sleepTimeBetweenScreenshot,
  };

  const childCollectionRef = collection(
    db,
    `/projects/${projectId}/pageSnapShot`
  );

  const q = query(childCollectionRef, orderBy('createdAt', 'desc'));

  const childCollectionSnapshot = await getDocs(q);

  const childDocuments: PageSnapShotType[] = await Promise.all(
    childCollectionSnapshot.docs.map(async (childDoc) => {
      const data = childDoc.data();
      return {
        url: data.url,
        id: childDoc.id,
        createdAt: data.createdAt,
      };
    })
  );

  projectData.pageSnapShot = childDocuments;

  return { message: 'Get Project Success', data: projectData };
};

export const getProjectUserIdAndCollaborators = async (projectId: string) => {
  const docRef = doc(db, `/projects/${projectId}`);

  const docSnap = await getDoc(docRef);

  const project = docSnap.data();

  return { userId: project?.userId, collaborators: project?.collaborators };
};

export const editProject = async (
  projectId: string,
  payload: { name: string; description: string },
  userId: string
): Promise<EditProjectResponse> => {
  const { name, description } = payload;

  const docRef = doc(db, `/projects/${projectId}`);

  const isAllow = handleIsProjectBelongToThisUser(projectId, userId);

  if (!isAllow) {
    throw new AxiosError('User is invalid');
  }

  const projectSnap = await getDoc(docRef);

  if (!projectSnap.exists()) {
    throw new AxiosError('Something went wrong');
  }

  const projectDetail = projectSnap.data();

  const newInformationOfProject = {
    name: name || projectDetail.name,
    description: description || projectDetail.description,
  };

  await updateDoc(docRef, newInformationOfProject);

  const project: ProjectType = {
    id: projectSnap.id,
    userId: projectDetail.userId,
    name: newInformationOfProject.name,
    createdAt: projectDetail.createdAt,
    basicAuth: projectDetail.basicAuth,
    updatedAt: projectDetail.updatedAt,
    collaborators: projectDetail.collaborators,
    description: newInformationOfProject.description,
    approvedCommitId: projectDetail.approvedCommitId,
    screenshotSchedule: projectDetail.screenshotSchedule,
  };

  return { message: 'Update success', data: project };
};

export const inviteOtherToCollaboration = async (
  projectId: string,
  email: string
) => {
  const projectRef = doc(db, `/projects/${projectId}`);

  await updateDoc(projectRef, {
    collaborators: arrayUnion(email),
  });

  return {
    message: `${email} has been successfully added to the project.`,
    data: email,
  };
};

export const kickUserFromCollaboration = async (
  projectId: string,
  email: string
) => {
  const projectRef = doc(db, `/projects/${projectId}`);

  await updateDoc(projectRef, {
    collaborators: arrayRemove(email),
  });

  return {
    message: `${email} is no longer a collaborator on this project.`,
    data: email,
  };
};

export const addSlackWebhookURLToProject = async (
  projectId: string,
  payload: {
    slackWebhookURL: string;
  }
) => {
  const { slackWebhookURL } = payload;

  const projectRef = doc(db, `/projects/${projectId}`);

  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new AxiosError('Something went wrong');
  }

  await updateDoc(projectRef, { slackWebhookURL: slackWebhookURL });

  return { message: 'Update success', data: slackWebhookURL };
};
