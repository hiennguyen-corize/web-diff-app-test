import { ModalScrollRef } from '@/components/ui/ViewTestResult/Body/ViewResultModal/Modal';
import { currentModeAtom } from '@/components/ui/ViewTestResult/Body/ViewResultModal/Modal/TopModalWrapper/SelectMode';
import { CompareInputDataType } from '@/components/ui/ViewTestResult/Body/ViewResultModal/ModalContentInputData';
import { RESULT_VIEW_MODE } from '@/types';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, RefObject, useEffect } from 'react';
import { DiffPixel } from './DiffPixel';
import { SliderProps } from './Slider';

const SliderDynamic = dynamic<SliderProps>(
  () => import('./Slider').then((mod) => mod.Slider),
  {
    ssr: false,
    loading: () => (
      <Image
        width={900}
        height={1000}
        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        src={'/images/placeholder-blur.jpg'}
        alt={'Placeholder image'}
      />
    ),
  }
);

type Props = {
  compareInputData: CompareInputDataType;
  modalScrollRef: RefObject<ModalScrollRef | null>;
};

export const isFirstScreenshotAtom = atom(false);

export const ModalContentView: FC<Props> = ({
  compareInputData,
  modalScrollRef,
}) => {
  const currentMode = useAtomValue(currentModeAtom);
  const setIsFirstScreenshot = useSetAtom(isFirstScreenshotAtom);

  useEffect(() => {
    setIsFirstScreenshot(!compareInputData.from);
  }, [compareInputData.from, setIsFirstScreenshot]);

  if (!compareInputData.from) {
    return (
      <DiffPixel
        isShow
        compareInputData={compareInputData}
        modalScrollRef={modalScrollRef}
      />
    );
  }

  return (
    <>
      <DiffPixel
        isShow={currentMode === RESULT_VIEW_MODE.DIFF_PIXEL}
        compareInputData={compareInputData}
        modalScrollRef={modalScrollRef}
      />
      <SliderDynamic
        isShow={currentMode === RESULT_VIEW_MODE.SLIDER}
        result={compareInputData.result}
        from={compareInputData.from}
        to={compareInputData.to}
        modalScrollRef={modalScrollRef}
      />
    </>
  );
};
