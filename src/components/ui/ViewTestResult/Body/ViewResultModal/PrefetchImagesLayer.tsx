import { PREFETCH_IMAGE_CLASS } from '@/constants/common';
import { PREFETCH_IMAGE_DELAY_TIME } from '@/constants/modal';
import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { FC, useEffect, useMemo } from 'react';
import { ModalContentLayer } from './ModalContentLayer';

type Props = {
  open: boolean;
  onClose: () => void;
  commitPageSnapshot: CommitPageSnapshotType;
};

export const PrefetchImagesLayer: FC<Props> = ({
  open,
  onClose,
  commitPageSnapshot,
}) => {
  const compareFrom = useMemo(() => {
    if (!commitPageSnapshot.screenshot.compareFrom) {
      return [];
    }

    const paths = commitPageSnapshot.screenshot.compareFrom.imagePaths || {};
    const compareToPaths =
      commitPageSnapshot.screenshot.compareTo.imagePaths || {};
    const comparedImages = commitPageSnapshot.screenshot.comparedImages || {};

    const pathsOneArr = Object.values(paths);
    const pathsTwoArr = Object.values(compareToPaths);
    const objectPathsThreeArr = Object.values(comparedImages);
    const pathsThreeArr = objectPathsThreeArr.map((item) => item.url);

    return [...pathsOneArr, ...pathsTwoArr, ...pathsThreeArr];
  }, [commitPageSnapshot]);

  useEffect(() => {
    const head = document.querySelector('head');

    if (!head) {
      return;
    }

    const linkElements: HTMLLinkElement[] = [];

    const timeout = setTimeout(() => {
      compareFrom.forEach((path) => {
        const link = document.createElement('link');
        link.className = PREFETCH_IMAGE_CLASS;
        link.rel = 'prefetch';
        link.href = path;
        link.as = 'image';
        head.appendChild(link);
        linkElements.push(link);
      });
    }, PREFETCH_IMAGE_DELAY_TIME);

    return () => {
      clearTimeout(timeout);
      linkElements.forEach((link) => link.remove());
    };
  }, [compareFrom]);

  return (
    <ModalContentLayer
      open={open}
      onClose={onClose}
      commitPageSnapshot={commitPageSnapshot}
    />
  );
};
