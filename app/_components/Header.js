"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import OpenStatus from "./OpenStatus";

const NAV = [
  { href: "/schedule", label: "Schedule" },
  { href: "/membership", label: "Membership" },
  { href: "/about", label: "Trainers" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > last.current && y > 120);
        last.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 bg-black2 text-cream2 transition-transform duration-300 ${hidden && !open ? "-translate-y-full" : ""}`}
    >
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        <Link
          href='/'
          onClick={close}
          className='flex items-center gap-2.5'
          aria-label='Kinetic House home'
        >
          <svg width='26' height='26' viewBox='0 0 32 32' aria-hidden='true'>
            <rect width='32' height='32' fill='#E5572D' />
            <path d='M18 4 8 18h6l-2 10 10-15h-6z' fill='#17181A' />
          </svg>
          <span className='font-display text-2xl tracking-wider leading-none'>
            KINETIC HOUSE
          </span>
        </Link>
        <nav className='hidden md:flex items-center gap-8' aria-label='Main'>
          {NAV.map((n) => {
            const active = path === n.href || path.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative font-body text-sm py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-coral after:transition-all after:duration-300 ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                {n.label}
              </Link>
            );
          })}
          <OpenStatus className='text-cream2/70' />
          <Link
            href='/trial'
            className='font-display text-sm tracking-wide bg-coral text-cream2 px-5 py-2.5 hover:bg-coral-deep transition-colors'
          >
            BOOK FREE TRIAL
          </Link>
        </nav>
        <button
          type='button'
          className='md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5'
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls='mobile-menu'
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-[2px] w-6 bg-cream2 transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`}
          />
          <span
            className={`h-[2px] w-6 bg-cream2 transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[2px] w-6 bg-cream2 transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`}
          />
        </button>
      </div>
      <div
        id='mobile-menu'
        className={`md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-black2 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <nav className='flex flex-col px-6 pt-8' aria-label='Mobile'>
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className='border-b border-cream2/10 py-5 font-display text-5xl tracking-wide'
              style={{
                transition: "transform .5s, opacity .5s",
                transitionDelay: `${i * 70}ms`,
                transform: open ? "none" : "translateY(20px)",
                opacity: open ? 1 : 0,
              }}
            >
              {n.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href='/trial'
            onClick={close}
            tabIndex={open ? 0 : -1}
            className='mt-8 bg-coral px-6 py-4 text-center font-display text-lg tracking-wide'
          >
            BOOK FREE TRIAL
          </Link>
          <OpenStatus className='mt-6 text-cream2/70' />
        </nav>
      </div>
    </header>
  );
}
