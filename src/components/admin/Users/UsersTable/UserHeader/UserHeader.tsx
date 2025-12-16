import { Button } from '@/components/ui/Button';
import { BUTTON_TYPE } from '@/types';
import { useRouter } from 'next-nprogress-bar';
import { FC } from 'react';
import {
  ButtonManageUser,
  TitleHeader,
  Wrapper,
  WrapperButton,
} from './styles';

export const UserHeader: FC = () => {
  const { push } = useRouter();

  return (
    <>
      <Wrapper>
        <TitleHeader>ADMIN</TitleHeader>
        <WrapperButton>
          <ButtonManageUser>
            <Button
              options={{
                title: 'Manage Project',
                type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
              }}
              onClick={() => push('/admin/projects')}
            />
          </ButtonManageUser>
        </WrapperButton>
      </Wrapper>
    </>
  );
};
