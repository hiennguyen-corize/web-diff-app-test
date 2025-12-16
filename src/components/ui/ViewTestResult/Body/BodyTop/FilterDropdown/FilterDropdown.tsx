import { useBooleanState } from '@/hooks/useBooleanState';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { useClickOutside } from '@/utils/clickOutside';
import Image from 'next/image';
import { FC, useMemo, useRef, useState } from 'react';
import ArrowIcon from './assets/arrow.svg';
import FailIcon from './assets/fail.svg';
import PendingIcon from './assets/pending.svg';
import SuccessIcon from './assets/success.svg';
import {
  ArrowWrapper,
  DropdownItems,
  DropdownWrapper,
  ItemWrapper,
  LabelWrapper,
} from './styles';

type Props = {
  onFilter: (filterState: SCREENSHOT_STATUS_TYPE) => void;
};

type FilterScreenshotStateType = Exclude<
  SCREENSHOT_STATUS_TYPE,
  'done' | 'error'
>;

export const FilterDropdown: FC<Props> = ({ onFilter }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    toggle,
    boolean: isActive,
    setFalse: setFilterClose,
  } = useBooleanState(false);

  const [filterState, setFilterState] = useState<FilterScreenshotStateType>();

  useClickOutside(dropdownRef, setFilterClose);

  const pageSnapshotStates = useMemo(() => {
    return {
      [SCREENSHOT_STATUS_TYPE.pending]: {
        title: 'Pending',
        icon: PendingIcon,
        value: SCREENSHOT_STATUS_TYPE.pending,
      },
      [SCREENSHOT_STATUS_TYPE.pass]: {
        title: 'Pass',
        icon: SuccessIcon,
        value: SCREENSHOT_STATUS_TYPE.pass,
      },
      [SCREENSHOT_STATUS_TYPE.fail]: {
        title: 'Fail',
        icon: FailIcon,
        value: SCREENSHOT_STATUS_TYPE.fail,
      },
    };
  }, []);

  const currentButton = useMemo(() => {
    if (!filterState) {
      return {
        title: 'Filter',
        icon: null,
        value: 'default',
      };
    }

    return pageSnapshotStates[filterState];
  }, [filterState, pageSnapshotStates]);

  const dropdownItems = useMemo(() => {
    return Object.values(pageSnapshotStates);
  }, [pageSnapshotStates]);

  const handleFilter = (filterState: FilterScreenshotStateType) => {
    setFilterState(filterState);
    onFilter(filterState);
    setFilterClose();
  };

  return (
    <DropdownWrapper ref={dropdownRef}>
      <LabelWrapper onClick={toggle}>
        {currentButton.icon ? (
          <Image src={currentButton.icon} alt='filter icon' />
        ) : null}
        {currentButton.title}
        <ArrowWrapper $isActive={isActive}>
          <Image src={ArrowIcon} alt='arrow icon' />
        </ArrowWrapper>
      </LabelWrapper>
      {isActive ? (
        <DropdownItems>
          {dropdownItems.map((item) => (
            <ItemWrapper
              key={item.value}
              onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                event.stopPropagation();
                handleFilter(item.value);
              }}
            >
              <Image src={item.icon} alt={item.title} />
              {item.title}
            </ItemWrapper>
          ))}
        </DropdownItems>
      ) : null}
    </DropdownWrapper>
  );
};
