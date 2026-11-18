"use client";
import { useState } from "react";
import { membership } from "../_lib/data";

const WEEKS = 4.33;
const drop = membership.find((m) => m.id === "drop-in").price;
const three = membership.find((m) => m.id === "foundation").price;
const unl = membership.find((m) => m.id === "unlimited").price;

export default function PlanCalculator() {
  const [n, setN] = useState(3);
  const dropCost = Math.round(drop * WEEKS * n);
  const rows = [
    { id: "drop", name: "Drop-In", cost: dropCost, ok: true },
    { id: "three", name: "3x / Week", cost: three, ok: n <= 3 },
    { id: "unl", name: "Unlimited", cost: unl, ok: true },
  ];
  const best = rows.filter((r) => r.ok).sort((a, b) => a.cost - b.cost)[0];
  const max = Math.max(...rows.map((r) => r.cost), 1);

  return (
    <div className='bg-black2 p-7 text-cream2 sm:p-10'>
      <label htmlFor='cpw' className='font-display text-3xl tracking-wide'>
        HOW OFTEN WILL YOU TRAIN?
      </label>
      <div className='mt-6 flex items-center gap-5'>
        <input
          id='cpw'
          type='range'
          min={1}
          max={7}
          step={1}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className='h-2 w-full cursor-pointer accent-[#E5572D]'
        />
        <p className='w-28 shrink-0 text-right font-display text-3xl'>
          {n}× / WEEK
        </p>
      </div>
      <div className='mt-8 space-y-4'>
        {rows.map((r) => (
          <div key={r.id} className={r.ok ? "" : "opacity-35"}>
            <div className='mb-1 flex justify-between font-body text-sm'>
              <span>
                {r.name}
                {!r.ok ? " (max 3 a week)" : ""}
              </span>
              <span className='font-semibold'>
                ${r.cost}/mo{r.id === "drop" ? " est." : ""}
              </span>
            </div>
            <div className='h-3 bg-cream2/10'>
              <div
                className={`h-full transition-[width] duration-700 ${r.ok && r.id === best.id ? "bg-coral" : "bg-cream2/40"}`}
                style={{ width: `${(r.cost / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className='mt-8 font-body text-sm text-cream2/80' aria-live='polite'>
        At {n} class{n > 1 ? "es" : ""} a week,{" "}
        <strong className='text-coral'>{best.name}</strong> is the cheapest way
        to train. Estimate only; this is a demo.
      </p>
    </div>
  );
}
