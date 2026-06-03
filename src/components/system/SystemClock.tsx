import { useEffect, useState } from "react";

export function SystemClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString([], { hour12: false });
  const date = now.toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const next = new Date();
  next.setHours(24, 0, 0, 0);
  const diff = Math.max(0, next.getTime() - now.getTime());
  const h = String(Math.floor(diff / 3_600_000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60_000) / 1000)).padStart(2, "0");

  return (
    <div className="flex items-center justify-between gap-2 text-[10px] font-display tracking-[0.25em] text-[var(--neon)]/80">
      <span>{date} · {time}</span>
      <span className="text-[var(--neon)]/60">RESET {h}:{m}:{s}</span>
    </div>
  );
}