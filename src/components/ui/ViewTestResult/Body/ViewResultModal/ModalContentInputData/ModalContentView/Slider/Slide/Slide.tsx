import Image from 'next/image';
import { FC, memo } from 'react';

type Props = { imageUrl: string; onLoad: () => void };

export const Slide: FC<Props> = memo(({ imageUrl, onLoad }) => {
  return (
    <Image
      width={3000}
      height={2000}
      src={imageUrl}
      className='compare-image'
      alt='Compare image'
      loading='lazy'
      onLoad={onLoad}
    />
  );
});

Slide.displayName = 'Slide';
