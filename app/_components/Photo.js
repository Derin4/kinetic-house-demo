import Image from "next/image";
import { PICTURES } from "../_lib/pictures";

// Renders a real photo when one is registered, else a labelled gradient placeholder.
export default function Photo({
  id,
  label,
  tone = ["#5B6067", "#17181A"],
  sizes = "(min-width:1024px) 33vw, 100vw",
  className = "",
  priority = false,
  grayscale = false,
}) {
  const src = PICTURES[id];
  return (
    <div
      className={`${/\babsolute\b/.test(className) ? "" : "relative"} overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(160deg, ${tone[0]} 0%, ${tone[1]} 100%)`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={label || ""}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${grayscale ? "grayscale group-hover:grayscale-0 transition duration-500" : ""}`}
        />
      ) : (
        <>
          <span className='absolute left-3 top-3 h-4 w-4 border-l border-t border-cream2/40' />
          <span className='absolute right-3 top-3 h-4 w-4 border-r border-t border-cream2/40' />
          <span className='absolute left-3 bottom-3 h-4 w-4 border-l border-b border-cream2/40' />
          <span className='absolute right-3 bottom-3 h-4 w-4 border-r border-b border-cream2/40' />
          {label ? (
            <span className='absolute inset-x-0 bottom-5 text-center font-body text-[11px] uppercase tracking-[0.2em] text-cream2/60'>
              {label}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
