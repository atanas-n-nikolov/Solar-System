export default function DateFormat(targetDate: string | Date) {
  const now = new Date();
  const target = new Date(targetDate);

  let diff = Math.abs(target.getTime() - now.getTime());

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  let hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  let minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  let seconds = Math.floor(diff / 1000);

  const formatNumber = (n: number) => String(n).padStart(2, '0');

  return [
    formatNumber(days),
    formatNumber(hours),
    formatNumber(minutes),
    formatNumber(seconds),
  ];
}
