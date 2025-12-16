import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 530px;
  margin: 0 auto;
`;

export const Header = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary_700};
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
