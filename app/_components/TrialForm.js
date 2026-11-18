"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { schedule, dayNames, SHOP } from "../_lib/data";
import {
  bookingCode,
  buildICS,
  classState,
  dayLabel,
  monthDay,
  spotsLeft,
  upcomingDates,
} from "../_lib/schedule";

const GOALS = [
  "Get stronger",
  "Lose weight",
  "Build a habit",
  "Move without pain",
  "Learn to box",
];
const EXPS = ["Brand new", "Some experience", "Trained before"];

export default function TrialForm() {
  const sp = useSearchParams();
  const qDay = sp.get("day");
  const qTime = sp.get("time");
  const [now, setNow] = useState(null);
  const [dates, setDates] = useState(null);
  const [iso, setIso] = useState(null);
  const [time, setTime] = useState(null);
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    goals: [],
    exp: "",
  });
  const [errs, setErrs] = useState({});
  const [ticket, setTicket] = useState(null);
  const top = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const n = new Date();
      const ds = upcomingDates(n, 14);
      const bookable = (d) =>
        schedule[d.day].some(
          (c) =>
            spotsLeft(c) > 0 &&
            !(d.offset === 0 && classState(c, n) === "past"),
        );
      let pick = null;
      if (qDay) {
        pick = ds.find(
          (d) =>
            d.day === qDay &&
            (d.offset > 0 ||
              schedule[d.day].some(
                (c) => c.time === qTime && classState(c, n) !== "past",
              )),
        );
      }
      if (!pick) pick = ds.find(bookable) || ds[0];
      setNow(n);
      setDates(ds);
      setIso(pick.iso);
      if (
        qDay &&
        qTime &&
        pick.day === qDay &&
        schedule[qDay].some((c) => c.time === qTime && spotsLeft(c) > 0)
      )
        setTime(qTime);
    });
    return () => cancelAnimationFrame(raf);
  }, [qDay, qTime]);

  const chosen = dates && dates.find((d) => d.iso === iso);
  const options = chosen ? schedule[chosen.day] : [];
  const cls = chosen && time ? options.find((c) => c.time === time) : null;
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggleGoal = (g) =>
    set(
      "goals",
      f.goals.includes(g) ? f.goals.filter((x) => x !== g) : [...f.goals, g],
    );

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!cls) er.cls = "Choose a class.";
    if (!f.name.trim()) er.name = "Tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setTicket({
      code: bookingCode(),
      cls,
      chosen,
      name: f.name.trim().split(" ")[0],
    });
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const download = () => {
    const ics = buildICS({
      iso: ticket.chosen.iso,
      time: ticket.cls.time,
      title: `Kinetic House: ${ticket.cls.name} (demo)`,
      location: `${SHOP.street}, ${SHOP.area}`,
    });
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "kinetic-house-trial.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const input =
    "w-full border border-black2/30 bg-cream2 px-4 py-3 font-body outline-none focus:border-coral";

  if (ticket) {
    return (
      <div ref={top} className='step-in mx-auto max-w-xl scroll-mt-24'>
        <div className='bg-black2 text-cream2'>
          <div className='p-8'>
            <p className='font-body text-xs uppercase tracking-[0.2em] text-coral'>
              Free trial
            </p>
            <h2 className='mt-2 font-display text-5xl tracking-wide'>
              TRIAL BOOKED
            </h2>
            <p className='mt-3 font-body text-cream2/75'>
              You&apos;re in, {ticket.name}. See you on the floor.
            </p>
          </div>
          <div className='relative border-t-2 border-dashed border-cream2/25 p-8'>
            <span className='absolute -left-3 -top-3 h-6 w-6 rounded-full bg-cream2' />
            <span className='absolute -right-3 -top-3 h-6 w-6 rounded-full bg-cream2' />
            <dl className='grid grid-cols-2 gap-6 font-body text-sm'>
              <div>
                <dt className='text-cream2/55'>Class</dt>
                <dd className='mt-1 text-lg'>{ticket.cls.name}</dd>
              </div>
              <div>
                <dt className='text-cream2/55'>Coach</dt>
                <dd className='mt-1 text-lg'>{ticket.cls.trainer}</dd>
              </div>
              <div>
                <dt className='text-cream2/55'>When</dt>
                <dd className='mt-1 text-lg'>
                  {dayNames[ticket.chosen.day]} {monthDay(ticket.chosen.date)},{" "}
                  {ticket.cls.time}
                </dd>
              </div>
              <div>
                <dt className='text-cream2/55'>Booking code</dt>
                <dd className='mt-1 font-display text-3xl tracking-wider text-coral'>
                  {ticket.code}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <button
          type='button'
          onClick={download}
          className='mt-5 w-full border border-black2 py-3 font-display tracking-wide transition-colors hover:bg-black2 hover:text-cream2'
        >
          ADD TO CALENDAR (.ICS)
        </button>
        <p className='mt-4 font-body text-sm text-black2/60'>
          This is a demo confirmation — no trial has actually been booked.
        </p>
        <button
          type='button'
          onClick={() => {
            setTicket(null);
            setTime(null);
          }}
          className='mt-3 font-body text-sm underline'
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className='grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px]'
    >
      <div className='min-w-0 space-y-12'>
        <section aria-labelledby='s1'>
          <h2 id='s1' className='mb-4 font-display text-3xl tracking-wide'>
            <span className='mr-3 text-coral'>01</span>PICK A DAY
          </h2>
          <div
            className='no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2'
            role='radiogroup'
            aria-label='Day'
          >
            {(dates || [...Array(14)]).map((d, i) =>
              d ? (
                <button
                  key={d.iso}
                  type='button'
                  role='radio'
                  aria-checked={iso === d.iso}
                  onClick={() => {
                    setIso(d.iso);
                    setTime(null);
                  }}
                  className={`flex w-[84px] shrink-0 flex-col items-center border py-3 transition-colors ${iso === d.iso ? "border-black2 bg-black2 text-cream2" : "border-black2/25 hover:border-black2"}`}
                >
                  <span className='font-body text-[11px] uppercase tracking-wider opacity-70'>
                    {d.offset === 0 ? "Today" : d.day}
                  </span>
                  <span className='font-display text-3xl leading-tight'>
                    {d.date.getDate()}
                  </span>
                  <span className='font-body text-[11px] opacity-60'>
                    {monthDay(d.date).split(" ")[0]}
                  </span>
                </button>
              ) : (
                <div
                  key={i}
                  className='h-[92px] w-[84px] shrink-0 animate-pulse bg-black2/5'
                />
              ),
            )}
          </div>
        </section>

        <section aria-labelledby='s2'>
          <h2 id='s2' className='mb-4 font-display text-3xl tracking-wide'>
            <span className='mr-3 text-coral'>02</span>PICK A CLASS
          </h2>
          <div
            className='grid gap-3 sm:grid-cols-2'
            role='radiogroup'
            aria-label='Class'
          >
            {options.map((c) => {
              const past =
                chosen.offset === 0 && now && classState(c, now) === "past";
              const dis = spotsLeft(c) === 0 || past;
              const on = time === c.time;
              return (
                <button
                  key={c.time}
                  type='button'
                  role='radio'
                  aria-checked={on}
                  disabled={dis}
                  onClick={() => setTime(c.time)}
                  className={`border p-4 text-left transition-colors ${on ? "border-coral bg-coral/10 ring-1 ring-coral" : "border-black2/25 hover:border-black2"} ${dis ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <span className='font-display text-2xl'>{c.time}</span>
                  <span className='mt-1 block font-body font-semibold'>
                    {c.name}
                  </span>
                  <span className='block font-body text-sm text-black2/60'>
                    with {c.trainer} ·{" "}
                    {past
                      ? "finished"
                      : spotsLeft(c) === 0
                        ? "full"
                        : `${spotsLeft(c)} spots left`}
                  </span>
                </button>
              );
            })}
          </div>
          {errs.cls ? (
            <p className='mt-2 font-body text-sm text-coral-deep' role='alert'>
              {errs.cls}
            </p>
          ) : null}
        </section>

        <section aria-labelledby='s3'>
          <h2 id='s3' className='mb-4 font-display text-3xl tracking-wide'>
            <span className='mr-3 text-coral'>03</span>YOUR DETAILS
          </h2>
          <div className='grid gap-5 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label
                htmlFor='t-name'
                className='mb-1.5 block font-body text-sm font-semibold'
              >
                Name
              </label>
              <input
                id='t-name'
                className={input}
                value={f.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete='name'
                aria-invalid={!!errs.name}
              />
              {errs.name ? (
                <p
                  className='mt-1 font-body text-sm text-coral-deep'
                  role='alert'
                >
                  {errs.name}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor='t-email'
                className='mb-1.5 block font-body text-sm font-semibold'
              >
                Email
              </label>
              <input
                id='t-email'
                type='email'
                className={input}
                value={f.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete='email'
                aria-invalid={!!errs.email}
              />
              {errs.email ? (
                <p
                  className='mt-1 font-body text-sm text-coral-deep'
                  role='alert'
                >
                  {errs.email}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor='t-phone'
                className='mb-1.5 block font-body text-sm font-semibold'
              >
                Phone{" "}
                <span className='font-normal text-black2/50'>(optional)</span>
              </label>
              <input
                id='t-phone'
                type='tel'
                className={input}
                value={f.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete='tel'
              />
            </div>
          </div>
          <fieldset className='mt-6'>
            <legend className='mb-2 font-body text-sm font-semibold'>
              What are you after?{" "}
              <span className='font-normal text-black2/50'>(optional)</span>
            </legend>
            <div className='flex flex-wrap gap-2'>
              {GOALS.map((g) => (
                <button
                  key={g}
                  type='button'
                  aria-pressed={f.goals.includes(g)}
                  onClick={() => toggleGoal(g)}
                  className={`border px-3.5 py-2 font-body text-sm transition-colors ${f.goals.includes(g) ? "border-black2 bg-black2 text-cream2" : "border-black2/25 hover:border-black2"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className='mt-6'>
            <legend className='mb-2 font-body text-sm font-semibold'>
              Experience{" "}
              <span className='font-normal text-black2/50'>(optional)</span>
            </legend>
            <div className='flex flex-wrap gap-2'>
              {EXPS.map((x) => (
                <button
                  key={x}
                  type='button'
                  aria-pressed={f.exp === x}
                  onClick={() => set("exp", f.exp === x ? "" : x)}
                  className={`border px-3.5 py-2 font-body text-sm transition-colors ${f.exp === x ? "border-black2 bg-black2 text-cream2" : "border-black2/25 hover:border-black2"}`}
                >
                  {x}
                </button>
              ))}
            </div>
          </fieldset>
        </section>
      </div>

      <aside className='lg:sticky lg:top-24 lg:self-start'>
        <div className='bg-black2 p-6 text-cream2'>
          <p className='font-body text-xs uppercase tracking-[0.2em] text-coral'>
            Your free class
          </p>
          <p className='mt-3 font-display text-3xl leading-tight tracking-wide'>
            {cls ? cls.name.toUpperCase() : "PICK A CLASS"}
          </p>
          <p className='mt-2 font-body text-sm text-cream2/70'>
            {cls && chosen
              ? `${dayLabel(chosen.offset, chosen.date)} · ${cls.time} · with ${cls.trainer}`
              : "Choose a day and class to see your summary."}
          </p>
          <p className='mt-5 flex items-baseline justify-between border-t border-cream2/15 pt-4 font-body text-sm'>
            <span>Total today</span>
            <span className='font-display text-3xl text-coral'>$0</span>
          </p>
          <button
            type='submit'
            className='mt-5 w-full bg-coral py-3.5 font-display tracking-wide transition-colors hover:bg-coral-deep'
          >
            BOOK FREE TRIAL (DEMO)
          </button>
          <p className='mt-3 font-body text-xs text-cream2/55'>
            No payment details needed. Demo only; nothing is sent.
          </p>
        </div>
      </aside>
    </form>
  );
}
