export function getUpcomingEvents(events = [], now = Date.now()) {
  const timestamp = new Date(now).getTime();
  return events.filter((event) => {
    const start = Date.parse(event.start);
    const end = Date.parse(event.end);
    return event.confirmed === true && Boolean(event.id && event.title?.trim()) &&
      Number.isFinite(start) && Number.isFinite(end) && end > start && end > timestamp;
  }).sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}

export function formatEventDate(value) {
  return new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "short", timeZone: "Europe/Rome" }).format(new Date(value));
}

export function formatEventTime(value) {
  return new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" }).format(new Date(value));
}

export function getSafeEventLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch { return null; }
}
