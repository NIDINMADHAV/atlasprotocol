import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Typewriter } from "@/components/system/Typewriter";

const LINES = [
  "[SYSTEM] BOOTING...",
  "[SYSTEM] LINKING NEURAL INTERFACE",
  "[SYSTEM] CALIBRATING HUNTER FRAME",
  "[SYSTEM] WELCOME, HUNTER",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= LINES.length) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [step, onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="mb-10 h-28 w-28 rounded-full border-2 border-dashed border-[var(--neon)] shadow-[0_0_40px_var(--neon)]"
      />
      <div className="font-display text-[var(--neon)] text-xs tracking-[0.4em] space-y-2">
        {LINES.slice(0, step).map((l) => (
          <div key={l} className="neon-text opacity-80">{l}</div>
        ))}
        {step < LINES.length && (
          <Typewriter
            text={LINES[step]}
            speed={24}
            onDone={() => setTimeout(() => setStep((s) => s + 1), 300)}
            className="neon-text"
          />
        )}
      </div>
    </motion.div>
  );
}