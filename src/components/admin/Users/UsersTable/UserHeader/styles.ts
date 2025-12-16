import { ButtonWrapper } from '@/components/ui/Button/styles';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 86px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 74px 135px 25px 135px;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.pageActions};
  background-color: ${({ theme }) => theme.colors.shade_200};
`;

export const WrapperButton = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const TitleHeader = styled.div`
  color: #2899e6;
  display: block;
  font-size: 48px;
  font-weight: 700;
  line-height: 24px;
`;

export const ButtonManageUser = styled.div`
  ${ButtonWrapper} {
    width: fit-content;
    white-space: nowrap;
  }
`;
