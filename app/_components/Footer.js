import Link from "next/link";

export default function Footer() {
  return (
    <footer className='relative overflow-hidden bg-black2 text-cream2'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-6 left-0 right-0 select-none text-center font-display leading-none text-transparent'
        style={{
          fontSize: "clamp(5rem,18vw,15rem)",
          WebkitTextStroke: "1px rgba(243,239,230,.09)",
        }}
      >
        KINETIC HOUSE
      </div>
      <div className='relative mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3'>
        <div>
          <p className='font-display text-2xl tracking-wide'>KINETIC HOUSE</p>
          <p className='mt-2 font-body text-sm text-cream2/70'>
            Strength, conditioning, and mobility — Old Mill District.
          </p>
        </div>
        <div className='font-body text-sm text-cream2/70'>
          <p>52 Foundry Lane</p>
          <p>Open daily, 6am–8pm</p>
        </div>
        <nav
          className='flex flex-col gap-2 font-body text-sm text-cream2/70'
          aria-label='Footer'
        >
          <Link href='/schedule' className='hover:text-cream2'>
            Schedule
          </Link>
          <Link href='/membership' className='hover:text-cream2'>
            Membership
          </Link>
          <Link href='/about' className='hover:text-cream2'>
            Trainers
          </Link>
          <Link href='/trial' className='hover:text-cream2'>
            Free trial
          </Link>
        </nav>
      </div>
      <div className='relative border-t border-cream2/10'>
        <div className='mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 font-body text-xs text-cream2/55 sm:flex-row sm:justify-between'>
          <p>
            This is a demo site built for the MyClickAid gallery. Schedule,
            capacity, and pricing here are illustrative only.
          </p>
          <p>© {new Date().getFullYear()} Kinetic House — demo site</p>
        </div>
      </div>
    </footer>
  );
}
