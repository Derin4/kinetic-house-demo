import { days, schedule, SHOP } from "./data";

const pad = (n) => String(n).padStart(2, "0");

export function parseTime(t) {
  const [hm, ap] = t.split(" ");
  let [h, m] = hm.split(":").map(Number);
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

// Mon = 0 ... Sun = 6
export const dayIndex = (d) => (d.getDay() + 6) % 7;
export const dayKey = (d) => days[dayIndex(d)];

export const spotsLeft = (c) => Math.max(0, c.total - c.filled);

export const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const monthDay = (d) => `${MONTHS[d.getMonth()]} ${d.getDate()}`;

// "live" while a class is on (60 minutes), "past" once finished.
export function classState(c, now) {
  const mins = now.getHours() * 60 + now.getMinutes();
  const start = parseTime(c.time);
  if (mins >= start + 60) return "past";
  if (mins >= start) return "live";
  return "upcoming";
}

// The next `n` classes that have not finished, starting from today.
export function nextUp(now, n = 3) {
  const out = [];
  const today = dayIndex(now);
  for (let i = 0; i < 7 && out.length < n; i++) {
    const day = days[(today + i) % 7];
    for (const c of schedule[day]) {
      if (i === 0 && classState(c, now) === "past") continue;
      out.push({
        day,
        c,
        isToday: i === 0,
        offset: i,
        state: i === 0 ? classState(c, now) : "upcoming",
      });
      if (out.length >= n) break;
    }
  }
  return out;
}

// The next 14 calendar days, each with its schedule key.
export function upcomingDates(now, count = 14) {
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return [...Array(count)].map((_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return { iso: toISO(d), date: d, day: dayKey(d), offset: i };
  });
}

export function dayLabel(offset, date) {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  return `${dayKey(date)}, ${monthDay(date)}`;
}

export function openStatus(now) {
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins >= SHOP.open * 60 && mins < SHOP.close * 60) {
    return { open: true, text: `Open now, until ${SHOP.close - 12} PM` };
  }
  return {
    open: false,
    text:
      mins < SHOP.open * 60
        ? `Closed, opens at ${SHOP.open} AM`
        : `Closed, opens tomorrow at ${SHOP.open} AM`,
  };
}

// Calendar file for a confirmed trial class.
export function buildICS({ iso, time, title, location }) {
  const [y, mo, d] = iso.split("-").map(Number);
  const m = parseTime(time);
  const start = new Date(y, mo - 1, d, Math.floor(m / 60), m % 60);
  const end = new Date(start.getTime() + 60 * 60000);
  const f = (x) =>
    `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kinetic House demo//EN",
    "BEGIN:VEVENT",
    `UID:${f(start)}-demo@kinetichouse.example`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(start)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    "DESCRIPTION:Demo booking from a fictitious gym. Nothing was actually booked.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

// Demo booking code like KH-4821. Lives here (outside any component) so the
// React Compiler purity lint does not flag Math.random in a render scope.
export function bookingCode() {
  return `KH-${Math.floor(1000 + Math.random() * 9000)}`;
}
