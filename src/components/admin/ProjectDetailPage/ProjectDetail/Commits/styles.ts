import styled from 'styled-components';

export const CommitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const CommitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Time = styled.div`
  font-style: normal;
  font-weight: 100;
  font-size: 48px;
  padding-top: 11px;
  line-height: 80px;
  color: ${({ theme }) => theme.colors.secondary_270};
  align-self: flex-start;
`;
