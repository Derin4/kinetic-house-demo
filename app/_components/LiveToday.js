"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nextUp, spotsLeft } from "../_lib/schedule";
import { dayNames } from "../_lib/data";

export default function LiveToday() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    const run = () => setItems(nextUp(new Date(), 3));
    const raf = requestAnimationFrame(run);
    const id = setInterval(run, 60000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return (
    <div className='bg-cream2 text-black2 shadow-[8px_8px_0_0_#E5572D]'>
      <div className='flex items-center justify-between border-b border-black2/15 px-5 py-3'>
        <p className='font-display text-xl tracking-wide'>
          UP NEXT AT THE HOUSE
        </p>
        <span className='flex items-center gap-1.5 font-body text-[11px] uppercase tracking-widest'>
          <span className='live-dot h-2 w-2 rounded-full bg-coral' /> Live
        </span>
      </div>
      <ul className='min-h-[216px]' aria-live='polite'>
        {(items || [0, 1, 2]).map((it, i) =>
          !items ? (
            <li
              key={i}
              className='h-[72px] border-b border-black2/10 px-5 py-4'
            >
              <div className='h-full animate-pulse bg-black2/5' />
            </li>
          ) : (
            <li key={i} className='border-b border-black2/10 last:border-0'>
              <Link
                href={`/trial?day=${it.day}&time=${encodeURIComponent(it.c.time)}`}
                className='group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-paper'
              >
                <div className='w-20 shrink-0'>
                  <p className='font-display text-2xl leading-none'>
                    {it.c.time.replace(" ", " ")}
                  </p>
                  <p className='mt-1 font-body text-[11px] uppercase tracking-wider text-black2/55'>
                    {it.isToday
                      ? it.state === "live"
                        ? "On now"
                        : "Today"
                      : it.offset === 1
                        ? "Tomorrow"
                        : dayNames[it.day]}
                  </p>
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-body text-sm font-semibold'>
                    {it.c.name}
                  </p>
                  <p className='font-body text-xs text-black2/60'>
                    with {it.c.trainer}
                  </p>
                </div>
                <span
                  className={`shrink-0 font-body text-xs font-semibold ${spotsLeft(it.c) === 0 ? "text-black2/50" : spotsLeft(it.c) <= 3 ? "text-coral-deep" : "text-black2"}`}
                >
                  {spotsLeft(it.c) === 0 ? "Full" : `${spotsLeft(it.c)} left`}
                </span>
              </Link>
            </li>
          ),
        )}
      </ul>
      <Link
        href='/schedule'
        className='block bg-black2 px-5 py-3 text-center font-display text-sm tracking-wide text-cream2 transition-colors hover:bg-coral'
      >
        SEE THE FULL WEEK →
      </Link>
    </div>
  );
}
