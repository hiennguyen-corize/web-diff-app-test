import Image from 'next/image';
import { FC } from 'react';
import ImageOne from './assets/block-1.svg';
import ImageTwo from './assets/block-2.svg';
import { ImageOneWrap, ImagesWrapper, ImageTwoWrap } from './styles';

export const BlocksBackground: FC = () => {
  return (
    <ImagesWrapper>
      <ImageOneWrap>
        <Image
          src={ImageOne}
          width={ImageOne.width}
          height={ImageOne.height}
          alt='Background block'
        />
      </ImageOneWrap>
      <ImageTwoWrap>
        <Image
          src={ImageTwo}
          width={ImageTwo.width}
          height={ImageTwo.height}
          alt='Background block'
        />
      </ImageTwoWrap>
    </ImagesWrapper>
  );
};
