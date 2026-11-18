import Link from "next/link";
import { membership } from "../_lib/data";
import Reveal from "./Reveal";

export default function PlanCards({ compact = false }) {
  const plans = [membership[2], membership[1], membership[0]];
  return (
    <div className='grid gap-5 md:grid-cols-3 md:items-stretch'>
      {plans.map((p, i) => (
        <Reveal key={p.id} delay={i * 100} className='flex'>
          <div
            className={`relative flex w-full flex-col p-7 ${p.highlighted ? "bg-black2 text-cream2 md:-my-4 md:py-11" : "bg-paper"}`}
          >
            {p.highlighted ? (
              <span className='absolute -top-3 left-7 bg-coral px-3 py-1 font-display text-sm tracking-wide text-cream2'>
                BEST VALUE
              </span>
            ) : null}
            <h3 className='font-display text-3xl tracking-wide'>
              {p.name.toUpperCase()}
            </h3>
            <p className='mt-4 flex items-baseline gap-2'>
              <span className='font-display text-6xl leading-none'>
                ${p.price}
              </span>
              <span
                className={`font-body text-sm ${p.highlighted ? "text-cream2/60" : "text-black2/60"}`}
              >
                {p.period}
              </span>
            </p>
            {!compact ? (
              <ul className='mt-6 flex-1 space-y-3 font-body text-sm'>
                {p.features.map((f) => (
                  <li key={f} className='flex gap-3'>
                    <span className='text-coral' aria-hidden='true'>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            ) : (
              <div className='flex-1' />
            )}
            <Link
              href='/trial'
              className={`mt-8 block py-3 text-center font-display text-sm tracking-wide transition-colors ${p.highlighted ? "bg-coral text-cream2 hover:bg-coral-deep" : "bg-black2 text-cream2 hover:bg-coral"}`}
            >
              TRY IT FREE FIRST
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
