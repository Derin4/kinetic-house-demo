import Reveal from "./Reveal";

function Group({ n, tone, label, sub }) {
  return (
    <div>
      <div className='dots is-in flex flex-wrap gap-1.5' aria-hidden='true'>
        {[...Array(n)].map((_, i) => (
          <span
            key={i}
            className='dot h-3 w-3 rounded-full'
            style={{ "--i": i, background: tone }}
          />
        ))}
      </div>
      <p className='mt-3 font-display text-2xl tracking-wide'>{label}</p>
      <p className='font-body text-xs text-cream2/60'>{sub}</p>
    </div>
  );
}

export default function SizeCompare() {
  return (
    <Reveal className='grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-end'>
      <div className='[&_.dot]:!animate-none'>
        <div className='flex flex-wrap gap-1.5 opacity-40' aria-hidden='true'>
          {[...Array(60)].map((_, i) => (
            <span key={i} className='h-3 w-3 rounded-full bg-cream2' />
          ))}
        </div>
        <p className='mt-3 font-display text-2xl tracking-wide'>
          A BIG-BOX CLASS
        </p>
        <p className='font-body text-xs text-cream2/60'>
          Illustrative: 60 people, one coach.
        </p>
      </div>
      <p
        className='hidden font-display text-4xl text-coral sm:block'
        aria-hidden='true'
      >
        VS
      </p>
      <Group
        n={12}
        tone='#E5572D'
        label='A KINETIC HOUSE CLASS'
        sub='Illustrative: 12 people, one coach who sees every rep.'
      />
    </Reveal>
  );
}
