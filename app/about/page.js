import Link from "next/link";
import { teaches } from "../_components/CoachCards";
import Photo from "../_components/Photo";
import Reveal from "../_components/Reveal";
import SizeCompare from "../_components/SizeCompare";
import { trainers } from "../_lib/data";

export const metadata = { title: "Our Trainers — Kinetic House" };

export default function AboutPage() {
  return (
    <div>
      <div className='mx-auto max-w-6xl px-6 pb-8 pt-16'>
        <h1 className='mb-3 text-5xl tracking-wide sm:text-6xl'>
          OUR TRAINERS
        </h1>
        <p className='max-w-prose font-body text-black2/60'>
          Every coach at Kinetic House programs their own classes — nobody is
          reading off a franchise template. Classes stay capped small enough
          that they can actually watch your form, not just the clock.
        </p>
      </div>
      <div className='mx-auto max-w-6xl space-y-20 px-6 py-12'>
        {trainers.map((t, i) => (
          <Reveal key={t.id}>
            <article
              id={t.id}
              className={`grid scroll-mt-28 items-center gap-8 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <Photo
                id={t.pic}
                label={t.name}
                tone={[t.tone, "#17181A"]}
                sizes='(min-width:768px) 50vw, 100vw'
                className='aspect-[4/5] w-full max-w-md'
              />
              <div>
                <p className='font-body text-sm text-coral-deep'>
                  {t.focus} · {t.years} years coaching
                </p>
                <h2 className='mt-2 text-5xl tracking-wide sm:text-6xl'>
                  {t.name.toUpperCase()}
                </h2>
                <p className='mt-4 max-w-md font-body text-black2/75'>
                  {t.bio}
                </p>
                <p className='mt-5 border-l-4 border-coral pl-4 font-display text-2xl leading-tight tracking-wide'>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className='mt-6 font-body text-xs uppercase tracking-widest text-black2/55'>
                  Teaches
                </p>
                <ul className='mt-2 flex flex-wrap gap-2'>
                  {teaches(t.first).map((c) => (
                    <li key={c}>
                      <Link
                        href={`/schedule`}
                        className='inline-block border border-black2/25 px-3 py-1.5 font-body text-sm transition-colors hover:border-black2 hover:bg-black2 hover:text-cream2'
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <section className='bg-black2 py-20 text-cream2'>
        <div className='mx-auto max-w-6xl px-6'>
          <h2 className='mb-10 text-4xl tracking-wide sm:text-5xl'>
            WHY SMALL CLASSES
          </h2>
          <SizeCompare />
        </div>
      </section>
      <section className='bg-coral text-cream2'>
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-14 sm:flex-row'>
          <p className='font-display text-4xl tracking-wide'>
            MEET THEM ON THE FLOOR.
          </p>
          <Link
            href='/trial'
            className='bg-black2 px-7 py-3.5 font-display text-sm tracking-wide'
          >
            BOOK FREE TRIAL
          </Link>
        </div>
      </section>
    </div>
  );
}
