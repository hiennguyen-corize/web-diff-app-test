import { Button } from '@/components/ui/Button';
import { BUTTON_TYPE } from '@/types';
import { FC } from 'react';
import {
  ButtonManageUser,
  TitleHeader,
  Wrapper,
  WrapperButton,
} from './styles';
import { useRouter } from 'next-nprogress-bar';

export const ProjectHeader: FC = () => {
  const { push } = useRouter();

  return (
    <>
      <Wrapper>
        <TitleHeader>ADMIN</TitleHeader>
        <WrapperButton>
          <ButtonManageUser>
            <Button
              onClick={() => push('/admin/users')}
              options={{
                title: 'Manage User',
                type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
              }}
            />
          </ButtonManageUser>
        </WrapperButton>
      </Wrapper>
    </>
  );
};
