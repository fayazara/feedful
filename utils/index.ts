import rssParser from "./rssparser";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function kFormatter(num: number): string {
  if (Math.abs(num) > 999) {
    return (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "k";
  } else {
    return (Math.sign(num) * Math.abs(num)).toString();
  }
}

export const today = new Date().toLocaleDateString("en-US", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export { rssParser };

export function getTimeAgo(epochTimestamp: number): string {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const timeDifference = currentTime - epochTimestamp;

  if (timeDifference < 60) {
    return `${timeDifference}s ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes}m ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours}h ago`;
  } else if (timeDifference < 2592000) {
    const days = Math.floor(timeDifference / 86400);
    return `${days}d ago`;
  } else if (timeDifference < 31536000) {
    const months = Math.floor(timeDifference / 2592000);
    return `${months}mn ago`;
  } else {
    const years = Math.floor(timeDifference / 31536000);
    return `${years}y ago`;
  }
}
