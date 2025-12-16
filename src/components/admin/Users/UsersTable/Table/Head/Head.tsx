import { FC } from 'react';
import { Th, Tr } from './styles';

export const Head: FC = () => {
  return (
    <thead>
      <Tr>
        <Th>Email</Th>
        <Th>Role</Th>
        <Th>Join at</Th>
        <Th>More</Th>
      </Tr>
    </thead>
  );
};
