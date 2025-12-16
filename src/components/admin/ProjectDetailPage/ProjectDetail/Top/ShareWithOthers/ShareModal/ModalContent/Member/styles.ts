import styled from 'styled-components';

export const MemberItem = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const MemberMain = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TrashButton = styled.button`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const AvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

export const Name = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_700};
`;
