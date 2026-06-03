import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger" | "gold";

const styles: Record<Variant, string> = {
  primary:
    "bg-[oklch(0.78_0.18_235/0.15)] border-[var(--neon)] text-[var(--neon)] hover:bg-[oklch(0.78_0.18_235/0.3)] shadow-[0_0_16px_oklch(0.82_0.2_230/0.5),inset_0_0_12px_oklch(0.82_0.2_230/0.15)]",
  ghost:
    "bg-transparent border-[var(--neon-soft)] text-foreground hover:border-[var(--neon)] hover:text-[var(--neon)]",
  danger:
    "bg-[oklch(0.65_0.24_25/0.15)] border-[var(--danger)] text-[var(--danger)] hover:bg-[oklch(0.65_0.24_25/0.3)] shadow-[0_0_14px_oklch(0.7_0.25_18/0.5)]",
  gold:
    "bg-[oklch(0.88_0.16_90/0.12)] border-[var(--gold)] text-[var(--gold)] hover:bg-[oklch(0.88_0.16_90/0.22)] shadow-[0_0_14px_oklch(0.88_0.16_90/0.5)]",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export const NeonButton = forwardRef<HTMLButtonElement, Props>(
  function NeonButton(
    { variant = "primary", className = "", children, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={`relative font-display tracking-[0.2em] text-sm uppercase border px-5 py-3 rounded-sm transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden ${styles[variant]} ${className}`}
        {...rest}
      >
        <span
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, oklch(1 0 0 / 0.15) 50%, transparent 70%)",
          }}
        />
        <span className="relative">{children}</span>
      </button>
    );
  },
);