import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader';
import { ProjectType } from '@/models/GetProjectType';
import { FC, memo, ReactNode } from 'react';

type Props = {
  isLoading: boolean;
  project?: ProjectType;
  render: (project: ProjectType) => ReactNode;
};

export const ApiResultState: FC<Props> = memo(
  ({ isLoading, project, render }) => {
    if (isLoading) {
      return <SkeletonLoader />;
    }

    if (!project) {
      return null;
    }

    return render(project);
  }
);

ApiResultState.displayName = 'ApiResultState';
