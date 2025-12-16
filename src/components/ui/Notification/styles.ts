import { theme } from '@/configs/theme';
import { MEDIA_QUERY } from '@/utils/screenSize';
import styled from 'styled-components';

export const NotificationWrapper = styled.div<{
  type?: string;
  $menuVisible: boolean;
  $menuTop: boolean;
}>`
  width: 320px;
  position: fixed;
  z-index: ${theme.zIndex.notification};
  top: ${({ $menuVisible }) => ($menuVisible ? '140px' : '80px')};
  right: 0;
  height: 68px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'success': {
        return theme.colors.true_900;
      }

      case 'error': {
        return theme.colors.false_900;
      }

      case 'information': {
        return theme.colors.true_900;
      }

      case 'warning': {
        return theme.colors.false_700;
      }
    }
  }};

  @keyframes identifier {
    from {
      transform: translateX(352px);
    }
    to {
      transform: translateX(0);
    }
  }
  animation: identifier ease 0.5s;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    top: ${({ $menuTop }) => ($menuTop ? '48px' : 0)};
    width: 280px;
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 14px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.2px;
  color: ${theme.colors.shade_200};
`;

export const Description = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.1px;
  color: ${theme.colors.shade_200};
`;
