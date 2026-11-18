import { Suspense } from "react";
import TrialForm from "../_components/TrialForm";

export const metadata = { title: "Book Free Trial — Kinetic House" };

export default function TrialPage() {
  return (
    <div className='mx-auto max-w-6xl px-6 py-16'>
      <h1 className='mb-3 text-5xl tracking-wide sm:text-6xl'>
        BOOK YOUR FREE TRIAL
      </h1>
      <p className='mb-12 max-w-prose font-body text-black2/60'>
        One free class, no strings attached. Pick a day and class below.
      </p>
      <Suspense fallback={<div className='h-96 animate-pulse bg-black2/5' />}>
        <TrialForm />
      </Suspense>
    </div>
  );
}
