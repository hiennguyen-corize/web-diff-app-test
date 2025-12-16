import { uniqueId } from 'lodash';
import React, { FC, useCallback, useState } from 'react';

export const SHOW_TYPE = {
  slider: 'slider',
  document: 'document',
};

type Props = {
  onSelectShowType: (showMode: string) => void;
};

export const Switch: FC<Props> = ({ onSelectShowType }) => {
  const [checked, setChecked] = useState(false);
  const id = `switch-${uniqueId()}`;

  const handleSwitch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const { checked } = event.target;
      const { slider, document } = SHOW_TYPE;
      onSelectShowType(checked ? slider : document);
      setChecked(checked);
    },
    [onSelectShowType]
  );

  return (
    <div className='flex items-center gap-3'>
      <label htmlFor={id} className='cursor-pointer'>
        Compare mode:
      </label>
      <div className='flex gap-2 rounded-md px-2 py-2 shadow-3'>
        <label
          htmlFor={id}
          className={`${!checked ? 'font-bold' : 'font-light'} w-15 cursor-pointer pr-1 italic text-gray-600`}
        >
          Default
        </label>
        <div>
          <input
            id={id}
            type='checkbox'
            checked={checked}
            className='hidden'
            onChange={handleSwitch}
          />
          <label
            className={`flex h-6 w-10 cursor-pointer items-center border border-black p-1 transition-all ease-in-out ${checked ? 'justify-end bg-black' : 'justify-start'}`}
            htmlFor={id}
          >
            <span
              className={`h-4 w-4 cursor-pointer transition-all ease-in-out ${checked ? 'bg-white' : 'bg-black'}`}
            ></span>
          </label>
        </div>
        <span
          className={`${checked ? 'font-bold' : 'font-light'} w-15 cursor-pointer italic text-gray-600`}
        >
          Slider
        </span>
      </div>
    </div>
  );
};
