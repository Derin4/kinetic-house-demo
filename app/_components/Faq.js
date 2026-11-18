"use client";
import { useState } from "react";

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className='divide-y divide-black2/15 border-y border-black2/15'>
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q}>
            <button
              type='button'
              aria-expanded={on}
              onClick={() => setOpen(on ? -1 : i)}
              className='flex w-full items-center justify-between gap-6 py-5 text-left'
            >
              <span className='font-display text-2xl tracking-wide'>
                {f.q.toUpperCase()}
              </span>
              <span
                className={`font-display text-3xl text-coral transition-transform duration-300 ${on ? "rotate-45" : ""}`}
                aria-hidden='true'
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className='overflow-hidden'>
                <p className='max-w-2xl pb-6 font-body text-black2/70'>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
