export const formatDate = (date: string): string => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions | undefined = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  };

  return d.toLocaleString('en-US', options);
};
