import { atom } from 'jotai';
import { FC } from 'react';
import { AddPageByCsvButton } from './AddPageByCsvButton';
import { ParseUrlList } from './ParseUrlList';
import { UploadInput } from './UploadInput';
import { Wrapper } from './styles';

type Props = { onClose: () => void };

export type DisplayUrlType = {
  id: number;
  url: string;
  approved: boolean;
  isAllow: boolean;
};

export const uploadUrlList = atom<DisplayUrlType[]>([]);

export const AddUrlByCsv: FC<Props> = ({ onClose }) => {
  return (
    <Wrapper>
      <UploadInput />
      <ParseUrlList />
      <AddPageByCsvButton onClose={onClose} />
    </Wrapper>
  );
};
