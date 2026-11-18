import { Suspense } from "react";
import ScheduleClient from "../_components/ScheduleClient";

export const metadata = { title: "Schedule — Kinetic House" };

export default function SchedulePage() {
  return (
    <div className='mx-auto max-w-6xl px-6 py-16'>
      <h1 className='mb-3 text-5xl tracking-wide sm:text-6xl'>
        WEEKLY SCHEDULE
      </h1>
      <p className='mb-12 max-w-prose font-body text-black2/60'>
        Every class is capped for coaching quality, not just fire-code capacity.
        Book ahead — the popular slots fill fast.
      </p>
      <Suspense fallback={<div className='h-96 animate-pulse bg-black2/5' />}>
        <ScheduleClient />
      </Suspense>
    </div>
  );
}
