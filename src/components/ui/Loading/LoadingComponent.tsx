'use client';
import { FC } from 'react';
import LoadingIcon from './assets/loading.svg';
import { ContentWrapper, LoadingImage, LoadingText } from './styles';

export const LoadingComponent: FC = () => {
  return (
    <ContentWrapper>
      <LoadingImage src={LoadingIcon} alt='loading' />
      <LoadingText>Loading</LoadingText>
    </ContentWrapper>
  );
};
