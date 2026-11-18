"use client";
import Link from "next/link";
import { useState } from "react";
import { programs } from "../_lib/data";
import Photo from "./Photo";

export default function ProgramSlats() {
  const [active, setActive] = useState(0);
  return (
    <div className='flex flex-col gap-2 lg:h-[520px] lg:flex-row'>
      {programs.map((p, i) => {
        const on = active === i;
        return (
          <Link
            key={p.id}
            href={`/schedule?type=${p.group}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            data-on={on}
            className='group relative flex min-h-[120px] overflow-hidden bg-black2 text-cream2 transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:min-h-0'
            style={{ flexGrow: on ? 4 : 1, flexBasis: 0 }}
          >
            <Photo
              id={p.pic}
              tone={p.tone}
              label={p.name}
              sizes='(min-width:1024px) 40vw, 100vw'
              className='absolute inset-0'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10' />
            <div className='relative z-10 mt-auto w-full p-5'>
              <p
                className={`font-body text-[11px] uppercase tracking-[0.2em] text-coral ${on ? "" : "lg:hidden"}`}
              >
                {p.tag}
              </p>
              <h3
                className={`font-display text-4xl leading-none tracking-wide ${on ? "" : "lg:[writing-mode:vertical-rl] lg:rotate-180 lg:self-start"}`}
              >
                {p.name.toUpperCase()}
              </h3>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 max-lg:grid-rows-[1fr] max-lg:opacity-100"}`}
              >
                <div className='overflow-hidden'>
                  <p className='mt-3 max-w-sm font-body text-sm text-cream2/80'>
                    {p.text}
                  </p>
                  <p className='mt-3 font-display text-sm tracking-wide text-cream2'>
                    SEE CLASSES →
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
