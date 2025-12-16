import {
  ButtonGroupWrapper,
  Container,
  Header,
  InputsWrapper,
} from '@/components/pages/Setting/SettingTabs/styles';
import { Button } from '@/components/ui/Button';
import { FormItem } from '@/components/ui/Form/FormItem';
import { Input } from '@/components/ui/Form/Input';
import { URL_REGEX } from '@/constants/regex';
import { BUTTON_TYPE } from '@/types';
import { Controller } from 'react-hook-form';
import { useSlackWebhookURL } from './useSlackWebhookURL.hooks';

export const SlackWebhookURL = () => {
  const {
    control,
    disabled,
    notFound,
    isUpdating,
    handleCancel,
    handleSubmit,
    slackWebhookURL,
    notificationTest,
  } = useSlackWebhookURL();

  if (notFound) {
    return <div>Not found</div>;
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Header>Slack Webhook URL</Header>

      <InputsWrapper>
        <Controller
          name='slackWebhookURL'
          control={control}
          disabled={disabled}
          rules={{
            required: 'Slack Webhook URL is required',
            pattern: {
              value: URL_REGEX,
              message: 'Slack webhook URL is invalid',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem
              label='Slack Webhook URL'
              options={{ isError: !!error?.message, marginBottom: 16 }}
            >
              <Input
                type='text'
                value={value}
                defaultValue={slackWebhookURL}
                disabled={disabled}
                name='slackWebhookURL'
                isError={!!error?.message}
                errorMessage={error?.message}
                placeholder='Enter your Slack webhook URL here'
                onChange={onChange}
              />
            </FormItem>
          )}
        />
      </InputsWrapper>

      <ButtonGroupWrapper>
        <Button
          type='button'
          disabled={isUpdating}
          options={{
            type: BUTTON_TYPE.SECONDARY_MINIMAL_LARGE,
            title: 'Cancel',
          }}
          onClick={handleCancel}
        />

        <Button
          type='button'
          disabled={disabled}
          options={{
            type: BUTTON_TYPE.SECONDARY_DARK_LARGE,
            title: 'Noti Test',
          }}
          onClick={() => notificationTest()}
        />

        <Button
          type='submit'
          disabled={isUpdating}
          options={{
            type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
            title: isUpdating ? 'Updating...' : 'Update',
          }}
        />
      </ButtonGroupWrapper>
    </Container>
  );
};
