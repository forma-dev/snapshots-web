export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (date: Date): string => {
  const localDate = new Date(date);

  const timeZoneName = Intl.DateTimeFormat('en', {
    timeZoneName: 'short'
  }).formatToParts(localDate).find(part => part.type === 'timeZoneName')?.value || '';

  const dateString = localDate.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${dateString} ${timeZoneName}`;
};
