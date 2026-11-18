export default function Marquee({ items, dur = 40 }) {
  const row = (hidden) => (
    <div
      className='flex shrink-0 items-center'
      aria-hidden={hidden || undefined}
    >
      {items.map((t, i) => (
        <span
          key={i}
          className='flex items-center font-display text-3xl sm:text-4xl tracking-wide whitespace-nowrap'
        >
          <span className='px-6'>{t}</span>
          <span className='text-black2'>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className='ticker' style={{ "--dur": `${dur}s` }}>
      {row(false)}
      {row(true)}
    </div>
  );
}
