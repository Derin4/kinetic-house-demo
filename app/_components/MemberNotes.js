import { reviews } from "../_lib/data";
import Reveal from "./Reveal";

export default function MemberNotes() {
  return (
    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
      {reviews.map((r, i) => (
        <Reveal key={r.name} delay={(i % 3) * 90}>
          <figure className='flex h-full flex-col bg-paper p-6'>
            <span
              className='font-display text-6xl leading-none text-coral'
              aria-hidden='true'
            >
              “
            </span>
            <blockquote className='-mt-2 flex-1 font-body text-[15px] leading-relaxed'>
              {r.quote}
            </blockquote>
            <figcaption className='mt-5 flex justify-between font-body text-xs uppercase tracking-wider text-black2/60'>
              <span className='font-semibold text-black2'>{r.name}</span>
              <span>{r.plan}</span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
