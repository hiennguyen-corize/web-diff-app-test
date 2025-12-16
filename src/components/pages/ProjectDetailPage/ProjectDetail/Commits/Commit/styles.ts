import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const CommitWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px 54px;
  gap: 25px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;

  &:hover {
    background: rgba(0, 0, 0, 0.009);
  }

  ${Column} {
    &:first-child {
      flex: 1 1 18%;
      align-items: flex-start;
      width: 100%;
      overflow: hidden;

      @media screen and (max-width: 1440px) {
        flex: 1 1 13%;
      }
    }

    &:nth-child(2) {
      flex: 1 1 5%;
      width: 100%;
    }

    &:nth-child(3) {
      flex: 1 1 10%;
      width: 100%;
    }

    &:nth-child(4) {
      flex: 1 1 10%;
      width: 100%;
    }

    &:nth-child(5) {
      flex: 1 1 13%;
      width: 100%;
    }

    &:nth-child(6) {
      flex: 1 1 19%;
      width: 100%;
    }

    &:last-child {
      flex: 1 1 25%;
      width: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: row;
      gap: 16px;

      @media screen and (max-width: 1440px) {
        flex: 1 1 30%;
      }
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Bold = styled.div`
  font-weight: 700;
`;

export const FinishedAtWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const CreatedAtComponent = styled(FinishedAtWrapper)``;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 15px;
`;

export const ButtonCustom = styled.div`
  width: 100px;
`;

export const CommitId = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.secondary_250};

  div[data-tooltip-id] {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
`;
