import { ProjectType } from './GetProjectType';

export type ProjectsOmitType = Omit<ProjectType, 'pageSnapShot'>;

export type GetProjectsResponseType = {
  message: string;
  data: ProjectsOmitType[];
};

export type GetProjectsRequest = {
  userId: string;
  email: string;
};
