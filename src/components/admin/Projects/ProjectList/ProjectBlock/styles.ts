import Link from 'next/link';
import styled from 'styled-components';

export const WrapperBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.shade_750};
  background-color: ${({ theme }) => theme.colors.shade_270};
  position: relative;
  white-space: normal;
  word-break: break-word;
  cursor: pointer;
  border-radius: 8px;
  outline: none;
  padding: 17.11px 24px 27.09px 24px;
  display: flex;
  flex-direction: column;
  gap: 13.46px;
  width: calc(100% / 4 - 19px);

  &:hover {
    box-shadow: 0px 0px 10px 5px ${({ theme }) => theme.colors.secondary_200};
  }
`;

export const ProjectTitleWrapper = styled.span`
  color: ${({ theme }) => theme.colors.primary_750};
  display: block;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0;
  text-rendering: optimizeLegibility;
  transition: color 0.3s ease;
  text-overflow: ellipsis;
  width: 70%;
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
  height: 49.34px;
`;
