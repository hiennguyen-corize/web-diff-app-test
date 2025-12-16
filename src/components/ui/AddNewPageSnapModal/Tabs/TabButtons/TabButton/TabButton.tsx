import { TabType } from '@/components/ui/AddNewPageSnapModal/Tabs/TabButtons';
import Image from 'next/image';
import { FC } from 'react';
import ImportIcon from './assets/import.svg';
import { ImageWrapper, Li, TextWrapper } from './styles';

type Props = { tab: TabType; isActive: boolean; onClick: () => void };

export const TabButton: FC<Props> = ({ tab, isActive, onClick }) => {
  return (
    <Li onClick={onClick} $isActive={isActive}>
      <ImageWrapper $isActive={isActive}>
        <Image src={ImportIcon} alt='tab-icon' />
      </ImageWrapper>
      <TextWrapper $isActive={isActive}>{tab.name}</TextWrapper>
    </Li>
  );
};
