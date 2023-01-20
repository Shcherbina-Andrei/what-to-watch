export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${hours}h ${restMinutes}m`;
};
