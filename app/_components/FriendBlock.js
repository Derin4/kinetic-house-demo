import Link from "next/link";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function FriendBlock() {
  return (
    <Reveal className='grid items-center gap-8 md:grid-cols-2'>
      <Photo
        id='friend'
        label='Bring a friend'
        tone={["#B84A26", "#17181A"]}
        sizes='(min-width:768px) 50vw, 100vw'
        className='aspect-[8/5] w-full'
      />
      <div>
        <p className='font-body text-sm text-coral-deep'>Unlimited members</p>
        <h2 className='mt-2 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl'>
          BRING A FRIEND. ON US.
        </h2>
        <p className='mt-4 max-w-md font-body text-black2/70'>
          Every Unlimited membership includes one guest pass a month. Training
          is easier with someone to blame for the early alarm.
        </p>
        <Link
          href='/membership'
          className='mt-6 inline-block border-b-2 border-black2 pb-1 font-display text-lg tracking-wide transition-colors hover:border-coral hover:text-coral'
        >
          SEE MEMBERSHIPS →
        </Link>
      </div>
    </Reveal>
  );
}
