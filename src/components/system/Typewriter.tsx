import { useEffect, useState } from "react";

export function Typewriter({
  text,
  speed = 28,
  className = "",
  onDone,
}: {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(t);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed, onDone]);
  return (
    <span className={className}>
      {out}
      <span className="ml-0.5 inline-block w-2 h-[1em] align-middle bg-[var(--neon)] animate-pulse" />
    </span>
  );
}