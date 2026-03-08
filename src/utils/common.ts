import moment from 'moment'

export function getLocalDate(date: string | Date | undefined | null): string {
  if (date == null) {
    return ''
  }
  if (typeof date === 'string') {
    return moment(new Date(date)).format('YYYY-MM-DD HH:mm')
  }
  return moment(date).format('YYYY-MM-DD HH:mm')
}

export function formatDuration(durationRaw: string): string {
  const duration = moment.duration(durationRaw);

  const hours = String(duration.hours()).padStart(2, "0");
  const minutes = String(duration.minutes()).padStart(2, "0");
  const seconds = String(duration.seconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
