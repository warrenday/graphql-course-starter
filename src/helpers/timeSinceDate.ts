/**
 * Returns the time since the date.
 * @param date - The date to compare to the current date
 * @returns The time since the date
 *
 * @example
 * 5 minutes
 * 1 day
 * 2 weeks
 * 1 month
 * 1 year
 */
const timeSinceDate = (date: Date) => {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export default timeSinceDate;
