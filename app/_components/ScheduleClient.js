"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { days, dayNames, schedule, GROUPS } from "../_lib/data";
import {
  classState,
  monthDay,
  spotsLeft,
  upcomingDates,
} from "../_lib/schedule";
import CapacityDots from "./CapacityDots";

const FILTERS = ["All", ...GROUPS];

function Bolts({ n }) {
  return (
    <span
      className='inline-flex gap-0.5'
      role='img'
      aria-label={`Effort ${n} of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width='10'
          height='14'
          viewBox='0 0 10 14'
          aria-hidden='true'
        >
          <path
            d='M6 0 0 8h4l-1 6 7-9H6z'
            fill={i <= n ? "#E5572D" : "none"}
            stroke={i <= n ? "#E5572D" : "rgba(23,24,26,.3)"}
            strokeWidth='1'
          />
        </svg>
      ))}
    </span>
  );
}

export default function ScheduleClient() {
  const sp = useSearchParams();
  const initial = FILTERS.includes(sp.get("type")) ? sp.get("type") : "All";
  const [filter, setFilter] = useState(initial);
  const [day, setDay] = useState("Mon");
  const [now, setNow] = useState(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const n = new Date();
      setNow(n);
      if (!touched) setDay(days[(n.getDay() + 6) % 7]);
    });
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dates = useMemo(
    () =>
      now
        ? upcomingDates(now, 7).reduce((a, d) => ({ ...a, [d.day]: d }), {})
        : {},
    [now],
  );
  const todayKey = now ? upcomingDates(now, 1)[0].day : null;

  const pick = (f) => {
    setFilter(f);
    try {
      const u = new URL(window.location.href);
      if (f === "All") u.searchParams.delete("type");
      else u.searchParams.set("type", f);
      window.history.replaceState(null, "", u);
    } catch {}
  };

  const rows = (d) =>
    schedule[d].filter((c) => filter === "All" || c.group === filter);
  const list = rows(day);

  return (
    <div>
      <div
        className='no-scrollbar -mx-6 mb-8 flex gap-2 overflow-x-auto px-6'
        role='group'
        aria-label='Filter by type'
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            type='button'
            aria-pressed={filter === f}
            onClick={() => pick(f)}
            className={`shrink-0 border px-4 py-2 font-body text-sm transition-colors ${filter === f ? "border-black2 bg-black2 text-cream2" : "border-black2/25 hover:border-black2"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        className='grid grid-cols-7 gap-1.5 sm:gap-2'
        role='tablist'
        aria-label='Day of week'
      >
        {days.map((d) => {
          const rs = rows(d);
          const tot = rs.reduce((s, c) => s + c.total, 0);
          const fil = rs.reduce((s, c) => s + c.filled, 0);
          const on = d === day;
          return (
            <button
              key={d}
              role='tab'
              type='button'
              aria-selected={on}
              onClick={() => {
                setTouched(true);
                setDay(d);
              }}
              className={`relative flex flex-col items-center gap-1 border px-1 py-3 transition-colors sm:py-4 ${on ? "border-black2 bg-black2 text-cream2" : "border-black2/20 hover:border-black2"}`}
            >
              <span className='font-display text-xl tracking-wide sm:text-2xl'>
                {d.toUpperCase()}
              </span>
              <span className='h-4 font-body text-[10px] uppercase tracking-wider opacity-60 sm:text-[11px]'>
                {dates[d] ? monthDay(dates[d].date) : ""}
              </span>
              <span className='mt-1 h-[3px] w-3/4 overflow-hidden bg-current/20'>
                <span
                  className='block h-full bg-coral transition-[width] duration-500'
                  style={{ width: tot ? `${(fil / tot) * 100}%` : 0 }}
                />
              </span>
              {d === todayKey ? (
                <span className='absolute -top-2 bg-coral px-1.5 font-body text-[9px] font-bold uppercase tracking-widest text-cream2'>
                  Today
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <h2 className='mt-10 mb-4 font-display text-3xl tracking-wide'>
        {dayNames[day].toUpperCase()}
        {dates[day] ? (
          <span className='ml-3 font-body text-sm tracking-normal text-black2/55'>
            {monthDay(dates[day].date)}
          </span>
        ) : null}
      </h2>

      <ul
        key={day + filter}
        className='border-t border-black2/15'
        role='tabpanel'
      >
        {list.length === 0 ? (
          <li className='py-10 font-body text-black2/60'>
            No {filter.toLowerCase()} classes on {dayNames[day]}. Try another
            day or{" "}
            <button
              type='button'
              className='underline'
              onClick={() => pick("All")}
            >
              show everything
            </button>
            .
          </li>
        ) : null}
        {list.map((c, i) => {
          const isToday = day === todayKey;
          const st = isToday && now ? classState(c, now) : "upcoming";
          const left = spotsLeft(c);
          const full = left === 0;
          const blocked = full || st === "past";
          return (
            <li
              key={c.time}
              className={`step-in grid items-center gap-x-6 gap-y-3 border-b border-black2/15 py-5 sm:grid-cols-[110px_1fr_220px_120px] ${st === "past" ? "opacity-45" : ""}`}
              style={{ "--d": `${i * 70}ms` }}
            >
              <div>
                <p className='font-display text-3xl leading-none'>{c.time}</p>
                {st === "live" ? (
                  <p className='mt-1 flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-widest text-coral-deep'>
                    <span className='live-dot h-2 w-2 rounded-full bg-coral' />
                    On now
                  </p>
                ) : null}
                {st === "past" ? (
                  <p className='mt-1 font-body text-[11px] uppercase tracking-widest'>
                    Finished
                  </p>
                ) : null}
              </div>
              <div>
                <p className='font-display text-2xl tracking-wide'>
                  {c.name.toUpperCase()}
                </p>
                <p className='mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-black2/65'>
                  <span>with {c.trainer}</span>
                  <span className='border border-black2/25 px-2 py-0.5 text-[11px] uppercase tracking-wider'>
                    {c.group}
                  </span>
                  <Bolts n={c.level} />
                </p>
              </div>
              <div>
                <CapacityDots total={c.total} filled={c.filled} />
                <p
                  className={`mt-2 font-body text-xs font-semibold ${full ? "text-black2/55" : left <= 3 ? "text-coral-deep" : ""}`}
                >
                  {full ? "Class full" : `${left} of ${c.total} spots left`}
                </p>
              </div>
              {blocked ? (
                <span className='border border-black2/20 py-3 text-center font-display text-sm tracking-wide text-black2/45'>
                  {st === "past" ? "CLOSED" : "FULL"}
                </span>
              ) : (
                <Link
                  href={`/trial?day=${day}&time=${encodeURIComponent(c.time)}`}
                  className='bg-coral py-3 text-center font-display text-sm tracking-wide text-cream2 transition-colors hover:bg-black2'
                >
                  BOOK
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <p className='mt-6 font-body text-xs text-black2/50'>
        Capacity shown is illustrative. The first class is free; the BOOK button
        opens the free trial form.
      </p>
    </div>
  );
}
