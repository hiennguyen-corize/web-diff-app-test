import { ModalScrollRef } from '@/components/ui/ViewTestResult/Body/ViewResultModal/Modal';
import { CUSTOM_SLIDER_STYLE } from '@/constants/imageCompareSlider';
import { isModalSwitchingAtom } from '@/hooks/useModalSwitching.hooks';
import {
  HTMLImgComparisonSliderElement,
  ImgComparisonSlider,
} from '@img-comparison-slider/react';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { FC, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { HandleButton } from './HandleButton';
import { Slide } from './Slide';
import { Figure, PlaceholderImage, SliderWrapper } from './styles';

export type SliderProps = {
  to: string;
  from: string;
  result: string;
  isShow: boolean;
  modalScrollRef: RefObject<ModalScrollRef | null>;
};

export const Slider: FC<SliderProps> = ({
  modalScrollRef,
  result,
  isShow,
  from,
  to,
}) => {
  const imgComparisonSliderRef = useRef<HTMLImgComparisonSliderElement>(null);

  const isModalSwitching = useAtomValue(isModalSwitchingAtom);
  const [isLoaded, setIsLoaded] = useState({ imgA: false, imgB: false });

  const handleImageLoad = (conditionObject: {
    imgA?: boolean;
    imgB?: boolean;
  }) => {
    setIsLoaded((prev) => ({ ...prev, ...conditionObject }));
  };

  const isAllLoaded = isLoaded.imgA && isLoaded.imgB;

  useEffect(() => {
    modalScrollRef.current?.denyScroll();
    imgComparisonSliderRef.current?.focus();
    setIsLoaded({ imgA: false, imgB: false });
  }, [from, modalScrollRef, to]);

  const styleHandleBar = useCallback(
    (compareImageDiffShadowRoot: ShadowRoot) => {
      const handleElement =
        compareImageDiffShadowRoot.querySelector<HTMLElement>('.handle');

      if (handleElement) {
        handleElement.innerHTML = ReactDOMServer.renderToString(
          <HandleButton hide={!isAllLoaded} />
        );

        const style = document.createElement('style');
        style.innerHTML = CUSTOM_SLIDER_STYLE;
        compareImageDiffShadowRoot.appendChild(style);
      }
    },
    [isAllLoaded]
  );

  const measureRef = useCallback(
    (ref: HTMLImgComparisonSliderElement | null) => {
      if (!ref) {
        return;
      }

      const compareImageDiffShadowRoot = ref.shadowRoot;

      if (compareImageDiffShadowRoot instanceof ShadowRoot) {
        styleHandleBar(compareImageDiffShadowRoot);
      }
    },
    [styleHandleBar]
  );

  return (
    <SliderWrapper $show={isShow}>
      <PlaceholderImage $show={!isAllLoaded}>
        <Image
          src={result}
          width={3000}
          height={2000}
          alt={'Placeholder image'}
        />
      </PlaceholderImage>
      {!isModalSwitching && (
        <ImgComparisonSlider
          keyboard={'enabled'}
          ref={measureRef}
          id='compareImageDiff'
        >
          <Figure $show={isAllLoaded} slot='first'>
            <Slide
              imageUrl={from}
              onLoad={() => handleImageLoad({ imgA: true })}
            />
          </Figure>
          <Figure $show={isAllLoaded} slot='second'>
            <Slide
              imageUrl={to}
              onLoad={() => {
                handleImageLoad({ imgB: true });
                modalScrollRef.current?.allowScroll();
              }}
            />
          </Figure>
        </ImgComparisonSlider>
      )}
    </SliderWrapper>
  );
};
