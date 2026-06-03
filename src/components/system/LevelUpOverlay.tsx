import { AnimatePresence, motion } from "framer-motion";

export function LevelUpOverlay({
  show,
  level,
  rank,
  rankUp,
  onDone,
}: {
  show: boolean;
  level: number;
  rank: string;
  rankUp: boolean;
  onDone: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDone}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md px-6 cursor-pointer"
        >
          {/* Radiating rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
              className="absolute h-64 w-64 rounded-full border-2 border-[var(--neon)]"
            />
          ))}
          <motion.div
            initial={{ scale: 0.4, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
            className="hud-panel hud-bracket animate-pulse-glow p-8 text-center max-w-sm relative"
          >
            <div className="font-display text-[10px] tracking-[0.5em] text-[var(--neon)]/80 mb-1">
              ━━━ SYSTEM ━━━
            </div>
            <h2 className="font-display text-4xl neon-text animate-flicker mb-2">
              {rankUp ? "RANK UP" : "LEVEL UP"}
            </h2>
            {rankUp ? (
              <p className="text-[var(--gold)] font-display tracking-[0.4em] text-2xl">
                {rank} RANK
              </p>
            ) : (
              <p className="text-muted-foreground font-display tracking-[0.3em]">
                LV. {level} ATTAINED
              </p>
            )}
            <p className="mt-3 text-[10px] tracking-[0.3em] text-muted-foreground">
              [ TAP TO CONTINUE ]
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}