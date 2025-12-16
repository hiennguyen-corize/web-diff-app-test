'use client';
import { BackButton } from '@/components/ui/BackButton';
import { LoadingComponent } from '@/components/ui/Loading';
import { useTransitionRouter } from 'next-view-transitions';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import {
  Div,
  ProjectName,
  SettingContentWrapper,
  SettingHeaderWrapper,
  SettingPageWrapper,
} from './styles';

const SettingTabsDynamic = dynamic(
  () => import('./SettingTabs').then((mod) => mod.SettingTabs),
  {
    ssr: false,
    loading: () => <LoadingComponent />,
  }
);

export const SettingPage = () => {
  const searchParams = useSearchParams();
  const projectName = searchParams.get('projectName');

  const { back } = useTransitionRouter();

  return (
    <SettingPageWrapper>
      <BackButton back={back} />
      <SettingContentWrapper>
        <SettingHeaderWrapper>
          <Div>Project Setting: </Div>
          <ProjectName>{projectName}</ProjectName>
        </SettingHeaderWrapper>
        <SettingTabsDynamic />
      </SettingContentWrapper>
    </SettingPageWrapper>
  );
};
