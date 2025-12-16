import Link from 'next/link';
import styled from 'styled-components';

export const WrapperBlock = styled.div<{ $isDeleting: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.shade_750};
  background-color: ${({ theme, $isDeleting }) =>
    $isDeleting ? theme.colors.shade_700 : theme.colors.shade_270};
  position: relative;
  white-space: normal;
  word-break: break-word;
  cursor: ${({ $isDeleting }) => ($isDeleting ? 'not-allowed' : 'pointer')};
  border-radius: 8px;
  outline: none;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  gap: 13.46px;
  flex: 1 1 100%;

  &:hover {
    box-shadow: 0px 0px 10px 5px ${({ theme }) => theme.colors.secondary_200};
  }
`;

export const ProjectTitleWrapper = styled.span<{ $isOwner: boolean }>`
  color: ${({ theme }) => theme.colors.primary_750};
  display: block;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0;
  text-rendering: optimizeLegibility;
  transition: color 0.3s ease;
  text-overflow: ellipsis;
  width: ${({ $isOwner }) => (!$isOwner ? '100%' : '70%')};
  white-space: nowrap;
  overflow: hidden;
`;

export const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkCustom = styled(Link)``;

export const WrapperDescription = styled.div`
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;
