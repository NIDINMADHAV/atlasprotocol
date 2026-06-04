import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
  glow?: boolean;
  title?: string;
};

export const HudPanel = forwardRef<HTMLDivElement, Props>(function HudPanel(
  { children, glow = false, title, className = "", ...rest },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className={`hud-panel hud-bracket ${glow ? "animate-pulse-glow" : ""} ${className}`}
      {...rest}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-[var(--neon-soft)] px-4 py-2">
          <span className="font-display text-[10px] tracking-[0.3em] text-[var(--neon)]">
            ◤ {title}
          </span>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)]/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)]/20" />
          </span>
        </div>
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
});