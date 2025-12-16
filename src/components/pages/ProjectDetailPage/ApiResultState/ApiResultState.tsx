import {
  LoadingComponent,
  LoadingComponentContainer,
} from '@/components/ui/Loading';
import { ProjectType } from '@/models/GetProjectType';
import { FC, memo, ReactNode } from 'react';

type Props = {
  notFound: boolean;
  isLoading: boolean;
  project?: ProjectType;
  render: (project: ProjectType) => ReactNode;
};

/**
 * A component that renders a different content based on the state of an API request.
 *
 * @param isLoading Whether the API request is in progress.
 * @param project The project that was received from the API request.
 * @param render A render function that will be called with the project as an argument.
 * @param notFound Whether the API request returned a 404 status code.
 *
 * If `isLoading` is true, the component renders a skeleton loader.
 * If `notFound` is true, the component renders the string 'Not found'.
 * If `project` is null or undefined, the component renders nothing.
 * Otherwise, the component calls the `render` function with the `project` object as an argument.
 */
export const ApiResultState: FC<Props> = memo(
  ({ isLoading, project, render, notFound }) => {
    if (isLoading) {
      return (
        <LoadingComponentContainer>
          <LoadingComponent />
        </LoadingComponentContainer>
      );
    }

    if (notFound) {
      return 'Not found';
    }

    if (!project) {
      return null;
    }

    return render(project);
  }
);

ApiResultState.displayName = 'ApiResultState';
