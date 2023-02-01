export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${hours}h ${restMinutes}m`;
};

export const formatDurationForPlayer = (inputMinutes: number): string => {
  const hours = Math.floor(inputMinutes / 60);
  const minutes = Math.floor(inputMinutes % 60);
  const seconds = Math.floor(inputMinutes * 60 % 60);

  return `-${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
};

export const formatDurationToPercents = (seconds: number, duration: number): number => Math.floor(seconds / duration * 100);
