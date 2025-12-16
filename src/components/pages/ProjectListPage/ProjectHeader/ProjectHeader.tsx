import { FC } from 'react';
import { AddNewProject } from './AddNewProject';
import { Wrapper } from './styles';

export const ProjectHeader: FC = () => {
  return (
    <Wrapper>
      <AddNewProject />
    </Wrapper>
  );
};
