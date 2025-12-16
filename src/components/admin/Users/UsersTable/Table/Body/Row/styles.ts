import styled from 'styled-components';

export const Td = styled.td`
  padding: 34px 54px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const DateWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

export const Tr = styled.tr<{ disable?: boolean }>`
  background-color: ${({ theme, disable }) =>
    disable ? theme.colors.secondary_250 : theme.colors.shade_200};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
`;

export const ButtonCustom = styled.div<{ disable?: boolean }>`
  width: 105px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 5px;
  cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
`;

export const IconWrapper = styled.img<{ disable?: boolean }>`
  width: 24px;
  height: 24px;
  object-fit: cover;
  margin-left: 15px;
  cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
`;

export const UrlWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
  gap: 11px;
`;

export const WarningWrapper = styled.div<{ isOpen?: boolean }>`
  border: 1px solid;
  padding: 10px;
  border-radius: 5px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  bottom: 45px;
  right: -45px;
  background-color: ${({ theme }) => theme.colors.shade_200};
  ::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 75%;
    margin-left: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.secondary_900} transparent
      transparent transparent;
  }
`;

export const Title = styled.div``;
