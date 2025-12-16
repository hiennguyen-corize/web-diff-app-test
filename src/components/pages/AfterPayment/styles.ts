import styled from 'styled-components';

export const AfterPaymentModalWrapper = styled.div`
  max-width: 530px;
  margin: 0 auto;
  padding: 114.5px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const AfterPaymentModalContent = styled.div`
  padding: 60px 69px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

export const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
`;

export const NotificationText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
`;

export const NotificationSubText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_270};
`;
