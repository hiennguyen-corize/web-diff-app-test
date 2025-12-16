export const countTimeRun = (ms: number) => {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const hoursString = hours > 0 ? `${hours}` : '';

  const minutesString =
    minutes > 0 || hours > 0
      ? minutes < 10
        ? `0${minutes}`
        : `${minutes}`
      : '';

  const secondsString =
    seconds < 10 && seconds > 0 ? `0${seconds}` : `${seconds}`;

  const timeString = `${hoursString !== '' ? hoursString + ' : ' : ''}${minutesString !== '' ? minutesString + ' : ' : ''}${secondsString} s`;

  return timeString;
};
