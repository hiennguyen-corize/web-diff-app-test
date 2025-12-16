import { TIME_SUFFIXES_TYPE } from '@/types';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatHours = (hours: number) => {
  const hours12 = Math.max(0, Math.min(12, hours));

  if (hours12 === 0) {
    return '12';
  }

  return hours12;
};

export const formatMinutes = (minutes: number) =>
  Math.max(0, Math.min(59, minutes));

export const convertToISOString = (
  hours: string,
  minutes: string,
  suffix: TIME_SUFFIXES_TYPE
) => {
  const hoursNumber = Number(hours);
  const minutesNumber = Number(minutes);

  if (isNaN(hoursNumber) || isNaN(minutesNumber)) {
    return '';
  }

  const hours24 =
    (hoursNumber % 12) + (suffix === TIME_SUFFIXES_TYPE.PM ? 12 : 0);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localTime = dayjs()
    .tz(userTimeZone)
    .hour(hours24)
    .minute(minutesNumber)
    .second(0)
    .millisecond(0);

  return localTime.utc().toISOString();
};

export const convertISOStringToLocalTime = (isoString: string) => {
  const localTime = dayjs(isoString).local();
  const hours24 = localTime.hour();
  const minutes = localTime.minute().toString();
  const hours = (hours24 % 12 || 12).toString();
  const suffix = hours24 >= 12 ? TIME_SUFFIXES_TYPE.PM : TIME_SUFFIXES_TYPE.AM;

  return {
    hours,
    minutes,
    suffix,
  };
};
