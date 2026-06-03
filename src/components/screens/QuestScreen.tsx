import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HudPanel } from "@/components/system/HudPanel";
import { NeonButton } from "@/components/system/NeonButton";
import { Typewriter } from "@/components/system/Typewriter";
import { SystemClock } from "@/components/system/SystemClock";
import type { Workout } from "@/lib/workouts";
import { MOTIVATIONAL } from "@/lib/workouts";
import { vibrate, playBeep } from "@/lib/storage";

export function QuestScreen({
  workout,
  username,
  dayNumber,
  soundOn,
  onAccept,
  onDelay,
  alreadyDone,
}: {
  workout: Workout;
  username: string;
  dayNumber: number;
  soundOn: boolean;
  onAccept: () => void;
  onDelay: () => void;
  alreadyDone: boolean;
}) {
  const [showQuest, setShowQuest] = useState(false);
  const motiv = MOTIVATIONAL[dayNumber % MOTIVATIONAL.length];

  useEffect(() => {
    const t = setTimeout(() => {
      setShowQuest(true);
      vibrate([20, 50, 20, 50, 80]);
      playBeep(soundOn);
    }, 500);
    return () => clearTimeout(t);
  }, [soundOn]);

  return (
    <div className="px-4 py-6 pb-28 space-y-5 max-w-md mx-auto">
      <SystemClock />

      <div className="space-y-1 pt-2">
        <div className="font-display text-[10px] tracking-[0.4em] text-[var(--neon)]/70">
          ◆ HUNTER {username.toUpperCase()}
        </div>
        <h1 className="font-display text-2xl neon-text">DAY {dayNumber + 1}</h1>
        <p className="text-xs text-muted-foreground italic">
          &ldquo;<Typewriter text={motiv} speed={20} />&rdquo;
        </p>
      </div>

      <AnimatePresence>
        {showQuest && (
          <HudPanel title="SYSTEM NOTIFICATION" glow className="p-5 space-y-4">
            <div className="text-center space-y-1">
              <div className="font-display text-[10px] tracking-[0.4em] text-[var(--neon)]/70">
                ━━━━━━━━━━━━━━━━━━
              </div>
              <div className="font-display text-xs tracking-[0.3em] text-[var(--gold)]">
                DAILY QUEST AVAILABLE
              </div>
              <div className="font-display text-[10px] tracking-[0.4em] text-[var(--neon)]/70">
                ━━━━━━━━━━━━━━━━━━
              </div>
            </div>

            <div className="text-center space-y-1">
              <h2 className="font-display text-2xl neon-text">{workout.title}</h2>
              <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">
                {workout.subtitle}
              </p>
              <p className="text-[10px] tracking-[0.3em] text-[var(--neon)]/60">
                EMPHASIS · {workout.emphasis}
              </p>
            </div>

            <div className="space-y-2 border-t border-[var(--neon-soft)] pt-3">
              <div className="font-display text-[10px] tracking-[0.3em] text-[var(--gold)]">
                ▲ REWARDS
              </div>
              <ul className="space-y-1 text-sm">
                {workout.rewards.map((r) => (
                  <li
                    key={r}
                    className="text-[var(--gold)]/90 tracking-wide flex items-center gap-2"
                  >
                    <span className="text-xs">◇</span> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 border-t border-[var(--neon-soft)] pt-3">
              <div className="font-display text-[10px] tracking-[0.3em] text-[var(--danger)]">
                ▼ PENALTY FOR FAILURE
              </div>
              <p className="text-xs text-[var(--danger)]/80 tracking-wide">
                Quest Failure · Hunter integrity decreased
              </p>
            </div>

            <div className="space-y-2 border-t border-[var(--neon-soft)] pt-3">
              <div className="font-display text-[10px] tracking-[0.3em] text-[var(--neon)]">
                ◈ PROTOCOL ({workout.exercises.length} TASKS)
              </div>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                {workout.exercises.slice(0, 4).map((e) => (
                  <li key={e.name}>· {e.name}</li>
                ))}
                {workout.exercises.length > 4 && (
                  <li className="text-[var(--neon)]/60">
                    + {workout.exercises.length - 4} more…
                  </li>
                )}
              </ul>
            </div>

            {alreadyDone ? (
              <div className="rounded-sm border border-[var(--gold)] bg-[oklch(0.88_0.16_90/0.1)] p-3 text-center">
                <div className="font-display text-xs tracking-[0.3em] text-[var(--gold)]">
                  ✦ QUEST COMPLETE
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Return tomorrow for the next quest.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <NeonButton onClick={onDelay} variant="ghost">
                  DELAY
                </NeonButton>
                <NeonButton
                  onClick={() => {
                    vibrate(60);
                    playBeep(soundOn);
                    onAccept();
                  }}
                >
                  ACCEPT
                </NeonButton>
              </div>
            )}
          </HudPanel>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-[10px] tracking-[0.3em] text-muted-foreground"
      >
        ◤ SOLO LEVELING SYSTEM v1.0 ◢
      </motion.div>
    </div>
  );
}