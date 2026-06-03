import { useMemo } from "react";

export function Particles({ count = 28 }: { count?: number }) {
  const parts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        opacity: 0.3 + Math.random() * 0.6,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.82 0.2 230 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.2 230 / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          animation: "grid-shift 14s linear infinite",
        }}
      />
      {/* Particles */}
      {parts.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: "oklch(0.85 0.2 230)",
            boxShadow: "0 0 8px oklch(0.82 0.2 230 / 0.9)",
            opacity: p.opacity,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      {/* Scanline sweep */}
      <div
        className="absolute left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.82 0.2 230 / 0.08), transparent)",
          animation: "scan 8s linear infinite",
        }}
      />
    </div>
  );
}