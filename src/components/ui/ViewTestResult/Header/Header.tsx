import { BackButton } from '@/components/ui/BackButton';
import { useQueryString } from '@/hooks/useQueryString';
import { FC, useCallback } from 'react';
import { HeaderWrapper, ProjectName } from './styles';

type Props = {
  projectName: string;
};

export const Header: FC<Props> = ({ projectName }) => {
  const { navigate, removeQueryString } = useQueryString();

  const back = useCallback(() => {
    navigate(removeQueryString([{ name: 'commitId' }]));
  }, [navigate, removeQueryString]);

  return (
    <HeaderWrapper>
      <BackButton back={back} />
      <ProjectName>{projectName}</ProjectName>
    </HeaderWrapper>
  );
};
