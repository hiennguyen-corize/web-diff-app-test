import { FC } from 'react';
import {
  BackgroundImage,
  ButtonContentWrapper,
  ButtonText,
  ButtonTextWrapper,
  Container,
  CustomButtonWrapper,
  Header,
  SettingContentWrapper,
} from './style';

import ButtonBackground from './assets/ButtonLine.png';
import { Option } from './Option';

import { SubmitButtons } from '@/components/ui/Setting/SubmitButtons';
import { ScreenshotOptionType } from '@/models/ScreenshotOptionType';
import { BUTTON_TYPE } from '@/types';
import { uniqueId } from 'lodash';
import Image from 'next/image';
import AddIcon from './assets/Add_ring.svg';
import { useAddOptionScreenshot } from './useAddOptionScreenshot.hook';

export const ScreenshotOptionsSetting: FC = () => {
  const {
    screenshotOptions,
    modifyIdsMap,
    handleCancel,
    removeField,
    addField,
    onSubmit,
    notFound,
    disabled,
    loading,
    control,
  } = useAddOptionScreenshot();

  if (notFound) {
    return <div>Not found</div>;
  }

  return (
    <Container onSubmit={onSubmit}>
      <Header>Screenshot Global Variables</Header>
      <SettingContentWrapper>
        {screenshotOptions?.map(
          (option: ScreenshotOptionType & { isDeleted?: boolean }) => (
            <Option
              key={!!modifyIdsMap.get(option.id) ? uniqueId() : option.id}
              isHidden={option.isDeleted}
              removeField={removeField}
              disabled={disabled}
              control={control}
              loading={loading}
              option={option}
            />
          )
        )}
      </SettingContentWrapper>

      <CustomButtonWrapper
        $type={BUTTON_TYPE.SECONDARY_SUBTLE_LARGE}
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          addField();
        }}
        type='button'
      >
        <ButtonContentWrapper>
          <BackgroundImage
            src={ButtonBackground}
            alt='background'
            objectFit='cover'
          />
          <ButtonTextWrapper>
            <ButtonText>Add Field</ButtonText>
            <Image src={AddIcon} alt={'add icon'} />
          </ButtonTextWrapper>
        </ButtonContentWrapper>
      </CustomButtonWrapper>

      <SubmitButtons
        onCancel={handleCancel}
        isUpdating={disabled}
        disabled={disabled}
      />
    </Container>
  );
};
