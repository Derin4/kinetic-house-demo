import Faq from "../_components/Faq";
import PlanCalculator from "../_components/PlanCalculator";
import PlanCards from "../_components/PlanCards";
import Reveal from "../_components/Reveal";
import { FAQS } from "../_lib/data";

export const metadata = { title: "Membership — Kinetic House" };

export default function MembershipPage() {
  return (
    <div className='mx-auto max-w-6xl px-6 py-16'>
      <h1 className='mb-3 text-5xl tracking-wide sm:text-6xl'>MEMBERSHIP</h1>
      <p className='mb-14 max-w-prose font-body text-black2/60'>
        No long-term contracts. Cancel or pause any monthly plan with two
        weeks&apos; notice.
      </p>
      <PlanCards />
      <Reveal className='mt-24'>
        <PlanCalculator />
      </Reveal>
      <section className='mt-24'>
        <h2 className='mb-8 text-4xl tracking-wide sm:text-5xl'>QUESTIONS</h2>
        <Faq items={FAQS} />
      </section>
    </div>
  );
}
