export const countTimeRun = (ms: number) => {
  // Validate input: ensure ms is a valid positive number
  if (typeof ms !== 'number' || isNaN(ms) || ms < 0) {
    return '0 s';
  }

  // Convert to integer to avoid floating point issues
  const totalMs = Math.floor(ms);

  const seconds = Math.floor(totalMs / 1000) % 60;
  const minutes = Math.floor(totalMs / (1000 * 60)) % 60;
  const hours = Math.floor(totalMs / (1000 * 60 * 60));

  // Format hours with leading zero if needed
  const hoursString = hours > 0 ? `${hours}` : '';

  // Format minutes with leading zero if needed
  const minutesString =
    minutes > 0 || hours > 0
      ? minutes < 10
        ? `0${minutes}`
        : `${minutes}`
      : '';

  // Format seconds with leading zero if needed
  const secondsString =
    seconds < 10 ? `0${seconds}` : `${seconds}`;

  // Build time string with proper formatting
  const timeString = `${hoursString !== '' ? hoursString + ' : ' : ''}${minutesString !== '' ? minutesString + ' : ' : ''}${secondsString} s`;

  return timeString;
};
