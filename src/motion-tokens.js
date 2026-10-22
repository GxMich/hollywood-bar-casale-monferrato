export function cssTimeToMilliseconds(value, fallback = 240) {
  const match = String(value).trim().match(/^(\d*\.?\d+)(ms|s)$/);
  return match ? Number(match[1]) * (match[2] === 's' ? 1000 : 1) : fallback;
}
