import { useQueryString } from '@/hooks/useQueryString';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { FC } from 'react';
import SettingIcon from './assets/setting.svg';
import { SettingWrapper } from './styles';

type Props = {
  projectId: string;
  projectName: string;
};

export const Setting: FC<Props> = ({ projectId, projectName }) => {
  const { createQueryString } = useQueryString();

  return (
    <SettingWrapper>
      <Link
        scroll
        href={`/project/detail/setting?${createQueryString([
          { name: 'projectId', value: projectId },
          { name: 'projectName', value: projectName },
        ])}`}
      >
        <Image src={SettingIcon} alt='setting-icon' width={30} height={30} />
      </Link>
    </SettingWrapper>
  );
};
