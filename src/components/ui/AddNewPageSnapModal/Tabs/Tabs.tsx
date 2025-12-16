import { FC } from 'react';
import { TabButtons } from './TabButtons';
import { TabContent } from './TabContent';
import { P, TabWrapper } from './styles';

type Props = { onClose: () => void };

export const Tabs: FC<Props> = ({ onClose }) => {
  return (
    <TabWrapper>
      <P>Add new page URL</P>
      <TabButtons />
      <TabContent onClose={onClose} />
    </TabWrapper>
  );
};
