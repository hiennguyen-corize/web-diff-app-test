import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DropdownButton = styled.button`
  padding: 6px 2px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 2rem;
  z-index: 10;
  width: 160px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.shade_200};
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const DropdownHeader = styled.div`
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.shade_950};
`;

export const DropdownList = styled.ul`
  padding: 10px 0;
  color: ${({ theme }) => theme.colors.shade_950};
`;

export const DropdownItem = styled.li`
  button {
    display: flex;
    width: 100%;
    justify-content: start;
    padding: 0.5rem 1rem;
    background-color: transparent;
    &:hover {
      background-color: ${({ theme }) => theme.colors.shade_270};
    }
  }
`;
