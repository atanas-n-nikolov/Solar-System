export default function DateFormat(targetDate: string | Date) {
  const now = new Date();
  const target = new Date(targetDate);

  let diff = Math.abs(target.getTime() - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  const formatNumber = (n: number) => String(n).padStart(2, '0');

  return [
    formatNumber(days),
    formatNumber(hours),
    formatNumber(minutes),
    formatNumber(seconds),
  ];
}
