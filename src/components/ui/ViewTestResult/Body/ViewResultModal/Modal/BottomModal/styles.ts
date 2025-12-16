import styled from 'styled-components';

export const BottomModalWrapper = styled.div`
  display: flex;
  gap: 18px;
  width: 90%;
  align-items: center;
`;

export const Text = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.shade_200};
  display: flex;
  gap: 5px;
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const MatchSection = styled.div`
  display: flex;
  width: 54%;
  align-items: center;
  gap: 18px;
  white-space: nowrap;
`;

export const RangeWrapper = styled.div`
  border-radius: 100px;
  overflow: hidden;
  height: 10px;
  width: 349px;
  background-color: ${({ theme }) => theme.colors.shade_200};
`;

export const MatchedPercent = styled.div<{ $matched: number }>`
  height: 100%;
  transition: all 0.5s ease-out;
  width: ${({ $matched }) => $matched}%;
  background-color: ${({ theme }) => theme.colors.primary_700};
`;
