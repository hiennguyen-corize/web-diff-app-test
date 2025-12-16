import {
  ChecksumResultType,
  PageSnapComparedImagesType,
} from '@/models/GetCommitsType';
import { CHECKSUM_RESULT, DEVICE_TYPE } from '@/types';
import { delay } from 'lodash';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import {
  BottomModalWrapper,
  MatchSection,
  MatchedPercent,
  RangeWrapper,
  Text,
  TextWrapper,
} from './styles';

type Props = {
  comparedImages: PageSnapComparedImagesType;
  currentDevice: DEVICE_TYPE;
  checksumResult?: ChecksumResultType;
};

export const BottomModal = forwardRef<HTMLDivElement, Props>(
  ({ comparedImages, currentDevice, checksumResult }, ref) => {
    const [matchedState, setMatchedState] = useState(0);
    const [isChecksumMatched, setIsChecksumMatched] = useState<boolean>();

    const setChecksumResult = useCallback((result?: boolean) => {
      setIsChecksumMatched(!!result);
    }, []);

    const handleMatched = useCallback(() => {
      switch (currentDevice) {
        case DEVICE_TYPE.DESKTOP:
          setMatchedState(comparedImages.desktop.matchPercent);
          setChecksumResult(checksumResult?.desktop);
          return;

        case DEVICE_TYPE.MOBILE:
          setMatchedState(comparedImages.mobile.matchPercent);
          setChecksumResult(checksumResult?.mobile);
          return;

        case DEVICE_TYPE.TABLET:
          setMatchedState(comparedImages.tablet.matchPercent);
          setChecksumResult(checksumResult?.tablet);
          return;
      }
    }, [
      checksumResult?.desktop,
      checksumResult?.mobile,
      checksumResult?.tablet,
      comparedImages.desktop.matchPercent,
      comparedImages.mobile.matchPercent,
      comparedImages.tablet.matchPercent,
      currentDevice,
      setChecksumResult,
    ]);

    useEffect(() => {
      const timer = delay(() => handleMatched(), 750);
      return () => clearTimeout(timer);
    }, [handleMatched]);

    return (
      <BottomModalWrapper ref={ref}>
        <TextWrapper>
          <MatchSection>
            <Text>Matched</Text>
            <RangeWrapper>
              <MatchedPercent $matched={matchedState} />
            </RangeWrapper>
            <Text>{matchedState}%</Text>
          </MatchSection>

          <Text>
            <span>Last vs Current Page-source:</span>
            <span>
              {isChecksumMatched === undefined && '------'}
              {!!isChecksumMatched && CHECKSUM_RESULT.MATCH}
              {isChecksumMatched === false && CHECKSUM_RESULT.MISMATCH}
            </span>
          </Text>
        </TextWrapper>
      </BottomModalWrapper>
    );
  }
);

BottomModal.displayName = 'BottomModal';
