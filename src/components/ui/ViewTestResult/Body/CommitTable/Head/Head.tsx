import { FC } from 'react';
import { Th, Tr } from './styles';

export const Head: FC = () => {
  return (
    <thead>
      <Tr>
        <Th>URL</Th>
        <Th>Status</Th>
        <Th>Snapshot Time (s)</Th>
        <Th>Time</Th>
      </Tr>
    </thead>
  );
};
