import Link from "next/link";
import CoachCards from "./_components/CoachCards";
import CountUp from "./_components/CountUp";
import FriendBlock from "./_components/FriendBlock";
import LiveToday from "./_components/LiveToday";
import Marquee from "./_components/Marquee";
import MemberNotes from "./_components/MemberNotes";
import Photo from "./_components/Photo";
import PlanCards from "./_components/PlanCards";
import ProgramSlats from "./_components/ProgramSlats";
import Reveal from "./_components/Reveal";
import SizeCompare from "./_components/SizeCompare";
import { GALLERY, STATS } from "./_lib/data";
import { PICTURES } from "./_lib/pictures";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className='grain relative isolate overflow-hidden bg-black2 text-cream2'>
        {PICTURES.hero ? (
          <>
            <Image
              src={PICTURES.hero}
              alt=''
              fill
              priority
              sizes='100vw'
              className='object-cover -z-10'
            />
            <div className='absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40' />
          </>
        ) : (
          <div
            className='absolute inset-0 -z-10'
            style={{
              background:
                "radial-gradient(60% 80% at 85% 20%, rgba(229,87,45,.28), transparent 60%), linear-gradient(160deg,#2a2c2f 0%,#17181a 70%)",
            }}
          />
        )}
        <div className='mx-auto grid max-w-6xl items-center gap-12 px-6 pb-28 pt-16 lg:grid-cols-[1.25fr_1fr] lg:pb-36 lg:pt-24'>
          <div>
            <p
              className='fade-up font-body text-sm text-coral'
              style={{ "--d": "100ms" }}
            >
              Old Mill District — small group training
            </p>
            <h1 className='mt-5 text-[clamp(3.6rem,10.5vw,8.2rem)] leading-[0.88] tracking-wide'>
              <span className='mask-line'>
                <span style={{ "--d": "150ms" }}>TRAIN WITH</span>
              </span>
              <span className='mask-line'>
                <span style={{ "--d": "260ms" }}>PEOPLE WHO</span>
              </span>
              <span className='mask-line'>
                <span style={{ "--d": "370ms" }}>
                  <span className='swipe text-coral'>NOTICE.</span>
                </span>
              </span>
            </h1>
            <p
              className='fade-up mt-7 max-w-prose font-body text-lg text-cream2/75'
              style={{ "--d": "650ms" }}
            >
              Classes capped small enough that your coach actually corrects your
              form, every session — not just the first one.
            </p>
            <div
              className='fade-up mt-9 flex flex-wrap items-center gap-x-8 gap-y-4'
              style={{ "--d": "800ms" }}
            >
              <Link
                href='/trial'
                className='inline-block bg-coral px-8 py-4 font-display tracking-wide text-cream2 transition-colors hover:bg-coral-deep'
              >
                BOOK FREE TRIAL
              </Link>
              <Link
                href='/schedule'
                className='border-b border-cream2/40 pb-1 font-body text-sm text-cream2 transition-colors hover:border-cream2'
              >
                View schedule
              </Link>
            </div>
          </div>
          <div className='fade-up' style={{ "--d": "700ms" }}>
            <LiveToday />
          </div>
        </div>
        <svg
          className='pulse-line pointer-events-none absolute inset-x-0 bottom-10 h-16 w-full'
          viewBox='0 0 1200 60'
          preserveAspectRatio='none'
          aria-hidden='true'
        >
          <path
            d='M0 30 H430 L460 30 L480 6 L505 54 L530 14 L548 30 H1200'
            fill='none'
            stroke='#E5572D'
            strokeWidth='2'
            vectorEffect='non-scaling-stroke'
          />
        </svg>
        <div
          className='absolute inset-x-0 bottom-0 h-14 bg-cream2'
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />
      </section>

      {/* TICKER */}
      <section
        className='-mt-1 overflow-hidden bg-coral py-3 text-black2'
        style={{ transform: "skewY(-1.5deg)" }}
        aria-hidden='true'
      >
        <Marquee
          items={[
            "STRENGTH",
            "CONDITIONING",
            "MOBILITY",
            "BOXING",
            "LIFTING",
            "RECOVERY",
          ]}
        />
      </section>

      {/* SMALL ON PURPOSE */}
      <section className='mx-auto max-w-6xl px-6 py-24'>
        <Reveal>
          <p className='font-body text-sm text-coral-deep'>Why it works</p>
          <h2 className='mt-2 max-w-3xl text-5xl leading-[0.95] tracking-wide sm:text-7xl'>
            SMALL ON PURPOSE.
          </h2>
        </Reveal>
        <div className='mt-12 grid gap-10 sm:grid-cols-3'>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <p className='font-display text-8xl leading-none tracking-wide'>
                <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className='mt-2 border-t-2 border-black2 pt-3 font-body text-sm text-black2/70'>
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
        <div className='mt-16 bg-black2 p-8 text-cream2 sm:p-12'>
          <SizeCompare />
        </div>
      </section>

      {/* PROGRAMS */}
      <section className='bg-paper py-24'>
        <div className='mx-auto max-w-6xl px-6'>
          <Reveal>
            <h2 className='text-5xl tracking-wide sm:text-6xl'>
              FOUR WAYS TO TRAIN
            </h2>
            <p className='mt-3 max-w-xl font-body text-black2/65'>
              Hover a lane to open it. Every one links straight to its classes.
            </p>
          </Reveal>
          <div className='mt-10'>
            <ProgramSlats />
          </div>
        </div>
      </section>

      {/* COACHES */}
      <section className='mx-auto max-w-6xl px-6 py-24'>
        <div className='mb-10 flex items-end justify-between'>
          <h2 className='text-4xl tracking-wide sm:text-5xl'>YOUR COACHES</h2>
          <Link
            href='/about'
            className='font-body text-sm underline underline-offset-4'
          >
            Meet everyone →
          </Link>
        </div>
        <CoachCards />
      </section>

      {/* MEMBERSHIP */}
      <section className='bg-black2 py-24 text-cream2 cut-top'>
        <div className='mx-auto max-w-6xl px-6 pt-8'>
          <Reveal>
            <h2 className='text-5xl tracking-wide sm:text-6xl'>
              PICK HOW YOU TRAIN
            </h2>
            <p className='mt-3 max-w-xl font-body text-cream2/65'>
              No long-term contracts. Cancel or pause any monthly plan with two
              weeks&apos; notice.
            </p>
          </Reveal>
          <div className='mt-14 text-black2'>
            <PlanCards compact />
          </div>
          <Link
            href='/membership'
            className='mt-10 inline-block border-b border-cream2/50 pb-1 font-body text-sm transition-colors hover:border-coral hover:text-coral'
          >
            Compare plans in detail →
          </Link>
        </div>
      </section>

      {/* PHOTO WALL */}
      <section className='mx-auto max-w-6xl px-6 py-24'>
        <h2 className='mb-10 text-4xl tracking-wide sm:text-5xl'>
          INSIDE THE HOUSE
        </h2>
        <div className='grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4'>
          {GALLERY.map((g, i) => (
            <Reveal key={g.id} delay={i * 70} className={g.span}>
              <Photo
                id={g.id}
                label={g.label}
                tone={g.tone}
                sizes='(min-width:640px) 25vw, 50vw'
                className='h-full w-full'
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MEMBER NOTES */}
      <section className='bg-cream2 pb-24'>
        <div className='mx-auto max-w-6xl px-6'>
          <h2 className='mb-10 text-4xl tracking-wide sm:text-5xl'>
            WHAT MEMBERS SAY
          </h2>
          <MemberNotes />
        </div>
      </section>

      {/* FRIEND */}
      <section className='mx-auto max-w-6xl px-6 pb-24'>
        <FriendBlock />
      </section>

      {/* CTA */}
      <section className='bg-coral text-cream2'>
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-14 sm:flex-row'>
          <p className='text-center font-display text-4xl tracking-wide sm:text-left'>
            YOUR FIRST CLASS IS FREE.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <Link
              href='/trial'
              className='bg-black2 px-7 py-3.5 font-display text-sm tracking-wide text-cream2 transition-colors hover:bg-black2/90'
            >
              CLAIM YOUR SPOT
            </Link>
            <Link
              href='/schedule'
              className='border border-cream2/70 px-7 py-3.5 font-display text-sm tracking-wide transition-colors hover:bg-cream2 hover:text-coral-deep'
            >
              VIEW SCHEDULE
            </Link>
            <Link
              href='/membership'
              className='border border-cream2/70 px-7 py-3.5 font-display text-sm tracking-wide transition-colors hover:bg-cream2 hover:text-coral-deep'
            >
              SEE PRICES
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
