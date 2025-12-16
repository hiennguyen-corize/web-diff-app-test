import { ModalScrollRef } from '@/components/ui/ViewTestResult/Body/ViewResultModal/Modal';
import { CompareInputDataType } from '@/components/ui/ViewTestResult/Body/ViewResultModal/ModalContentInputData';
import { isModalSwitchingAtom } from '@/hooks/useModalSwitching.hooks';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { FC, RefObject, useEffect, useState } from 'react';
import { ImageDisplay, ImageWrapper, PlaceholderImage } from './styles';

type Props = {
  isShow: boolean;
  compareInputData: CompareInputDataType;
  modalScrollRef: RefObject<ModalScrollRef | null>;
};

export const DiffPixel: FC<Props> = ({
  compareInputData,
  modalScrollRef,
  isShow,
}) => {
  const isModalSwitching = useAtomValue(isModalSwitchingAtom);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    modalScrollRef.current?.allowScroll();
  };

  useEffect(() => {
    setIsLoaded(false);
    modalScrollRef.current?.denyScroll();
  }, [compareInputData.result, modalScrollRef]);

  return (
    <ImageWrapper $show={isShow}>
      {!isLoaded && (
        <PlaceholderImage>
          <Image
            width={900}
            height={1000}
            src={'/images/placeholder-blur.jpg'}
            alt={'Placeholder image'}
          />
        </PlaceholderImage>
      )}
      {!isModalSwitching && (
        <ImageDisplay $show={isLoaded}>
          <Image
            width={900}
            height={1000}
            loading='lazy'
            src={compareInputData.result}
            alt={'Compare image result'}
            onLoad={handleImageLoad}
          />
        </ImageDisplay>
      )}
    </ImageWrapper>
  );
};
