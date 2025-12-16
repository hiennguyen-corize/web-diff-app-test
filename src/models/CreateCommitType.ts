import { ApiResponseCommon } from '@/types';
import { CommitType } from './GetCommitsType';

export type CreateCommitResponse = { data?: CommitType } & ApiResponseCommon;
