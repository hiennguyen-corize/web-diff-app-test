import { ApiResponseCommon } from '@/types';
import { CommitType } from './GetCommitsType';

export type GetCommitResponse = { data?: CommitType } & ApiResponseCommon;
