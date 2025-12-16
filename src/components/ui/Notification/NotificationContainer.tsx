import { useNotification } from '@/hooks/useNotification';
import dynamic from 'next/dynamic';
import { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import iconError from './assets/error.svg';
import iconInfor from './assets/infor.svg';
import iconSuccess from './assets/success.svg';
import iconWarning from './assets/warning.svg';
import { NotificationProps } from './Notification';

const NotificationDynamic = dynamic<NotificationProps>(
  () => import('./Notification').then((mod) => mod.Notification),
  {
    ssr: false,
  }
);

type OptionNotification = {
  title: string;
  icon: string;
};

export const NotificationContainer: FC = () => {
  const { t } = useTranslation();
  const { notification, setNotification } = useNotification();

  const handleImage: OptionNotification | undefined = useMemo(() => {
    if (notification?.type) {
      switch (notification.type) {
        case 'success': {
          return {
            title: t('Information.success'),
            icon: iconSuccess.src,
          };
        }

        case 'warning': {
          return {
            title: t('Information.warning'),
            icon: iconWarning.src,
          };
        }

        case 'infor': {
          return {
            title: t('Information.infor'),
            icon: iconInfor.src,
          };
        }

        case 'error': {
          return {
            title: t('Information.error'),
            icon: iconError.src,
          };
        }

        default: {
          return undefined;
        }
      }
    }
  }, [notification, t]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification, setNotification]);

  return notification?.type && handleImage && notification.message ? (
    <NotificationDynamic notification={notification} icon={handleImage.icon} />
  ) : null;
};

NotificationContainer.displayName = 'NotificationContainer';
