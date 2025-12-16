import db from '@/configs/firebase';
import { GetProjectsResponseType } from '@/models/GetProjectsType';
import { ProjectType } from '@/models/GetProjectType';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { compact } from 'lodash';

export const getProjects = async (): Promise<GetProjectsResponseType> => {
  const projectsCollectionRef = collection(db, '/projects');

  const projectsSnap = await getDocs(
    query(projectsCollectionRef, orderBy('createdAt', 'desc'))
  );

  const projectList: Omit<ProjectType, 'pageSnapshot'>[] =
    projectsSnap.docs.map((projectDoc) => {
      const data = projectDoc.data();

      return {
        name: data.name,
        id: projectDoc.id,
        userId: data.userId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        basicAuth: data.basicAuth,
        description: data.description,
        collaborators: data.collaborators,
        approvedCommitId: data.approvedCommitId,
      };
    });

  return {
    message: 'Get List Project Success',
    data: compact(projectList),
  };
};
