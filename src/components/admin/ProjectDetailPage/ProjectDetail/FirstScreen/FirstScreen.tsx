import { AddNewButton } from '@/components/ui/AddNewButton';
import { RunVisualButton } from '@/components/ui/RunVisualButton';

import { useFirstScreen } from '@/hooks/useFirstScreen';
import { PROJECT_DETAIL_STATE_TYPE } from '@/types';
import { FC } from 'react';
import { FirstScreenWrapper, SubTitle, Title } from './styles';

export const FirstScreen: FC = () => {
  const { projectDetailScreenState } = useFirstScreen();

  switch (projectDetailScreenState) {
    case PROJECT_DETAIL_STATE_TYPE.NOT_PAGES_AND_COMMITS:
      return (
        <FirstScreenWrapper>
          <Title>No URL yet</Title>
          <SubTitle>Add now!</SubTitle>
          <AddNewButton />
        </FirstScreenWrapper>
      );

    case PROJECT_DETAIL_STATE_TYPE.HAVE_PAGES_BUT_NOT_COMMITS:
      return (
        <FirstScreenWrapper>
          <Title>No test history yet</Title>
          <SubTitle>Start now!</SubTitle>
          <RunVisualButton />
        </FirstScreenWrapper>
      );

    default:
      return null;
  }
};
