"use client";
import { useEffect, useState } from "react";
import { openStatus } from "../_lib/schedule";

export default function OpenStatus({ className = "" }) {
  const [s, setS] = useState(null);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setS(openStatus(new Date())));
    const id = setInterval(() => setS(openStatus(new Date())), 60000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);
  return (
    <span
      className={`inline-flex items-center gap-2 font-body text-xs ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${s ? (s.open ? "bg-volt live-dot" : "bg-cream2/40") : "bg-cream2/20"}`}
      />
      <span>{s ? s.text : "Open daily, 6am–8pm"}</span>
    </span>
  );
}
