import Link from "next/link";
import { trainers, schedule, days } from "../_lib/data";
import Photo from "./Photo";
import Reveal from "./Reveal";

function teaches(first) {
  const set = new Set();
  days.forEach((d) =>
    schedule[d].forEach((c) => c.trainer === first && set.add(c.name)),
  );
  return [...set];
}

export { teaches };

export default function CoachCards() {
  return (
    <div className='grid grid-cols-2 gap-5 lg:grid-cols-4'>
      {trainers.map((t, i) => (
        <Reveal key={t.id} delay={i * 90}>
          <Link href={`/about#${t.id}`} className='group block'>
            <Photo
              id={t.pic}
              label={t.name}
              tone={[t.tone, "#17181A"]}
              grayscale
              sizes='(min-width:1024px) 25vw, 50vw'
              className='aspect-[4/5] w-full'
            />
            <div className='mt-3 h-[3px] w-0 bg-coral transition-all duration-500 group-hover:w-full' />
            <p className='mt-2 font-display text-2xl tracking-wide'>{t.name}</p>
            <p className='font-body text-sm text-black2/60'>{t.focus}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
