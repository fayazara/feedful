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
