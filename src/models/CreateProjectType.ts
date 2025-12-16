import { ApiResponseCommon } from '@/types';
import { ProjectType } from './GetProjectType';

export type CreateProjectResponse = { data?: ProjectType } & ApiResponseCommon;
