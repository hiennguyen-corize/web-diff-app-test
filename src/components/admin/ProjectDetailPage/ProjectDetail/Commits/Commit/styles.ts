import styled, { css } from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const CommitWrapper = styled.div<{ $isChangeDefaultStyles?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px 54px;
  gap: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;

  &:hover {
    background: rgba(0, 0, 0, 0.009);
  }

  ${({ $isChangeDefaultStyles }) =>
    $isChangeDefaultStyles
      ? css`
          ${Column} {
            &:first-child {
              width: 15%;
              align-items: flex-start;
            }

            &:nth-child(2) {
              width: 15%;
            }

            &:nth-child(3) {
              width: 15%;
            }

            &:nth-child(4) {
              width: 15%;
            }

            &:last-child {
              width: 40%;
            }
          }
        `
      : css`
          @media (max-width: 1440px) {
            gap: 25px;
            ${Column} {
              &:first-child {
                width: 6%;
                min-width: 6%;
                max-width: 6%;
                align-items: flex-start;
              }

              &:nth-child(2) {
                width: 6%;
                min-width: 6%;
                max-width: 6%;
              }

              &:nth-child(3) {
                width: 10%;
                min-width: 10%;
                max-width: 10%;
              }

              &:nth-child(4) {
                width: 10%;
                min-width: 10%;
                max-width: 10%;
              }

              &:nth-child(5) {
                width: 13%;
                min-width: 13%;
                max-width: 13%;
              }

              &:nth-child(6) {
                width: 13%;
                min-width: 13%;
                max-width: 13%;
              }

              &:last-child {
                width: 28%;
                min-width: 28%;
                max-width: 28%;
                align-items: flex-start;
                justify-content: flex-start;
                flex-direction: row;
                gap: 16px;
              }
            }
          }

          ${Column} {
            &:first-child {
              width: 5%;
              min-width: 5%;
              max-width: 5%;
              align-items: flex-start;
            }

            &:nth-child(2) {
              width: 5%;
              min-width: 5%;
              max-width: 5%;
            }

            &:nth-child(3) {
              width: 10%;
              min-width: 10%;
              max-width: 10%;
            }

            &:nth-child(4) {
              width: 10%;
              min-width: 10%;
              max-width: 10%;
            }

            &:nth-child(5) {
              width: 12%;
              min-width: 12%;
              max-width: 12%;
            }

            &:nth-child(6) {
              width: 12%;
              min-width: 12%;
              max-width: 12%;
            }

            &:last-child {
              width: 35%;
              min-width: 35%;
              max-width: 35%;
              align-items: flex-start;
              justify-content: flex-start;
              flex-direction: row;
              gap: 16px;
            }
          }
        `}
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
  justify-content: center;
  gap: 15px;
`;

export const WrapperCancel = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 45px;
`;

export const ButtonCustom = styled.div`
  width: 100px;
`;

export const CommitId = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_250};
`;
