export default function CapacityDots({ total, filled, size = "md" }) {
  const sz = size === "sm" ? "h-1.5 w-1.5" : "h-2.5 w-2.5";
  return (
    <span
      className='dots inline-flex flex-wrap gap-[3px] max-w-[190px]'
      aria-hidden='true'
    >
      {[...Array(total)].map((_, i) => (
        <span
          key={i}
          className={`dot ${sz} rounded-full ${i < filled ? "bg-black2" : "border border-black2/35"}`}
          style={{ "--i": i }}
        />
      ))}
    </span>
  );
}
