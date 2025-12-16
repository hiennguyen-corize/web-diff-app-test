import { SubmitButtons } from '@/components/ui/Setting/SubmitButtons';
import { ChangeEvent, FC } from 'react';
import {
  Container,
  Header,
  SliderContainer,
  SliderFooter,
  SliderHeader,
  SliderInput,
  SliderTitle,
  SliderValue,
} from './styles';
import { useDelayBetweenScreenshots } from './useDelayBetweenScreenshots.hooks';

export const DelayBetweenScreenshots: FC = () => {
  const {
    time,
    setTime,
    handleCancel,
    mutateDelayBetweenScreenshots,
    isDelayBetweenScreenshotsPending,
  } = useDelayBetweenScreenshots();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setTime(newValue);
  };

  return (
    <Container
      onSubmit={(event) => {
        event.preventDefault();
        mutateDelayBetweenScreenshots();
      }}
    >
      <Header>Delay Between Screenshots</Header>

      <SliderContainer>
        <SliderHeader>
          <SliderTitle>Delay Between Screenshots</SliderTitle>
          <SliderValue>{time}m</SliderValue>
        </SliderHeader>
        <SliderInput
          type='range'
          min={1}
          max={10}
          step={1}
          value={time}
          onChange={handleChange}
          disabled={isDelayBetweenScreenshotsPending}
        />
        <SliderFooter>
          <span>1m</span>
          <span>10m</span>
        </SliderFooter>
      </SliderContainer>

      <SubmitButtons
        onCancel={handleCancel}
        isUpdating={isDelayBetweenScreenshotsPending}
        disabled={isDelayBetweenScreenshotsPending}
      />
    </Container>
  );
};
