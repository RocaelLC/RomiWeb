export function formatLocal(isoUTC: string, tz: string) {
  const d = new Date(isoUTC);
  const date = d.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    timeZone: tz,
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: '2-digit', minute: '2-digit', timeZone: tz,
  });
  return `${date} · ${time}`;
}

export function msUntil(isoUTC: string) {
  const now = Date.now();
  const target = new Date(isoUTC).getTime();
  return target - now;
}

export function countdown(isoUTC: string) {
  const diff = msUntil(isoUTC);
  const sign = diff < 0 ? -1 : 1;
  const ms = Math.abs(diff);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return { hours: h * sign, minutes: m * sign };
}

