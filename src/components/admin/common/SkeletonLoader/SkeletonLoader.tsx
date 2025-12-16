import { theme } from '@/configs/theme';
import {
  SkeletonItem,
  SkeletonLoaderContainer,
  SkeletonText,
  SkeletonTextWrap,
} from './styles';

export const SkeletonLoader = () => {
  return (
    <SkeletonLoaderContainer role='status'>
      {[...Array(5)].map((_, index) => (
        <SkeletonItem key={index}>
          <SkeletonTextWrap>
            <SkeletonText
              $height='10px'
              $width='100px'
              $backgroundColor={theme.colors.secondary_250}
            />
            <SkeletonText
              $height='8px'
              $width='130px'
              $backgroundColor={theme.colors.secondary_200}
            />
          </SkeletonTextWrap>
          <SkeletonText
            $height='10px'
            $width='50px'
            $backgroundColor={theme.colors.secondary_250}
          />
        </SkeletonItem>
      ))}
    </SkeletonLoaderContainer>
  );
};
