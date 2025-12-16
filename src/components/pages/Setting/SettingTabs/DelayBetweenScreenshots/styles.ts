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

export const SliderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  font-family: 'Arial', sans-serif;
`;

export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #4a90e2;
  font-weight: 500;
`;

export const SliderTitle = styled.span`
  font-size: 16px;
`;

export const SliderValue = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const SliderInput = styled.input`
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  outline: none;
  border-radius: 3px;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #3a80d2;
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border: none;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #3a80d2;
      transform: scale(1.1);
    }
  }
`;

export const SliderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: #888;
  font-size: 12px;
`;
