import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { HudPanel } from "@/components/system/HudPanel";
import { NeonButton } from "@/components/system/NeonButton";
import type { Workout } from "@/lib/workouts";
import { vibrate, playBeep } from "@/lib/storage";

type Log = { done: boolean; weight: string; reps: string };

export function TrackingScreen({
  workout,
  soundOn,
  onComplete,
  onBack,
}: {
  workout: Workout;
  soundOn: boolean;
  onComplete: (durationMin: number) => void;
  onBack: () => void;
}) {
  const [logs, setLogs] = useState<Log[]>(
    workout.exercises.map(() => ({ done: false, weight: "", reps: "" })),
  );
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(Date.now());
  const [showWin, setShowWin] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const elapsedSec = Math.floor((now - startedAt) / 1000);
  const mm = String(Math.floor(elapsedSec / 60)).padStart(2, "0");
  const ss = String(elapsedSec % 60).padStart(2, "0");

  const completed = logs.filter((l) => l.done).length;
  const total = workout.exercises.length;
  const progress = (completed / total) * 100;
  const cals = Math.round(elapsedSec * 0.13); // ~8 cal/min rough estimate

  const allDone = useMemo(() => completed === total, [completed, total]);

  function toggle(i: number) {
    setLogs((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], done: !next[i].done };
      return next;
    });
    vibrate(30);
    playBeep(soundOn);
  }

  function complete() {
    setShowWin(true);
    vibrate([60, 40, 60, 40, 120]);
    playBeep(soundOn);
    setTimeout(() => onComplete(Math.max(1, Math.round(elapsedSec / 60))), 2200);
  }

  return (
    <div className="px-4 py-6 pb-28 space-y-4 max-w-md mx-auto">
      <button
        onClick={onBack}
        className="font-display text-[10px] tracking-[0.3em] text-[var(--neon)]/70 hover:text-[var(--neon)]"
      >
        ◀ BACK TO QUEST
      </button>

      <HudPanel title="ACTIVE QUEST" className="p-4">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h2 className="font-display text-xl neon-text">{workout.title}</h2>
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {workout.subtitle}
            </p>
          </div>
          <div className="text-right font-display text-[var(--neon)]">
            <div className="text-xs tracking-[0.2em]">⏱ {mm}:{ss}</div>
            <div className="text-[10px] tracking-[0.3em] text-[var(--gold)]/80">
              {cals} KCAL
            </div>
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[oklch(0.78_0.18_235/0.15)]">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-[var(--neon)] shadow-[0_0_10px_var(--neon)]"
          />
        </div>
        <div className="mt-1 text-[10px] font-display tracking-[0.3em] text-[var(--neon)]/70">
          PROGRESS · {completed}/{total}
        </div>
      </HudPanel>

      <div className="space-y-3">
        {workout.exercises.map((ex, i) => {
          const log = logs[i];
          return (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <HudPanel
                className={`p-4 transition-all ${
                  log.done ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(i)}
                    aria-label="toggle"
                    className={`mt-0.5 flex-none h-7 w-7 border rounded-sm flex items-center justify-center transition-all ${
                      log.done
                        ? "bg-[var(--neon)] border-[var(--neon)] text-[var(--primary-foreground)] shadow-[0_0_12px_var(--neon)]"
                        : "border-[var(--neon)] text-transparent hover:bg-[oklch(0.78_0.18_235/0.2)]"
                    }`}
                  >
                    ✓
                  </button>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-display text-sm tracking-wide ${
                        log.done ? "line-through text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {ex.name}
                    </div>
                    <div className="text-[10px] font-display tracking-[0.3em] text-[var(--neon)]/70 mt-0.5">
                      {ex.sets}
                    </div>
                    {!workout.rest && (
                      <div className="grid grid-cols-2 gap-2 mt-3">

                        {ex.name.includes("Plank") ||
                        ex.name.includes("Walk") ||
                        ex.name.includes("Cooldown") ? (

                          <input
                            type="text"
                            placeholder="time (min/sec)"
                            value={log.reps}
                            onChange={(e) =>
                              setLogs((p) => {
                                const n = [...p];
                                n[i] = {
                                  ...n[i],
                                  reps: e.target.value,
                                };
                                return n;
                              })
                            }
                            className="text-sm col-span-2"
                          />

                        ) : (

                          <>
                            <input
                              type="number"
                              placeholder="kg"
                              value={log.weight}
                              onChange={(e) =>
                                setLogs((p) => {
                                  const n = [...p];
                                  n[i] = {
                                    ...n[i],
                                    weight: e.target.value,
                                  };
                                  return n;
                                })
                              }
                              className="text-sm"
                            />

                            <input
                              type="number"
                              placeholder="reps"
                              value={log.reps}
                              onChange={(e) =>
                                setLogs((p) => {
                                  const n = [...p];
                                  n[i] = {
                                    ...n[i],
                                    reps: e.target.value,
                                  };
                                  return n;
                                })
                              }
                              className="text-sm"
                            />
                          </>

                        )}

                      </div>
                    )}
                  </div>
                </div>
              </HudPanel>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-4 pb-6">
        <NeonButton
          variant="gold"
          className="w-full"
          disabled={!allDone}
          onClick={complete}
        >
          {allDone ? "✦ COMPLETE QUEST" : `LOCKED · ${completed}/${total}`}
        </NeonButton>
      </div>

      <AnimatePresence>
        {showWin && <QuestCompleteOverlay />}
      </AnimatePresence>
    </div>
  );
}

function QuestCompleteOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm px-6"
    >
      <motion.div
        initial={{ scale: 0.6, rotate: -2 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="hud-panel hud-bracket animate-pulse-glow p-8 text-center max-w-sm"
      >
        <div className="font-display text-xs tracking-[0.4em] text-[var(--gold)] mb-2">
          ━━━ SYSTEM ━━━
        </div>
        <h2 className="font-display text-3xl neon-text mb-1 animate-flicker">
          QUEST COMPLETE
        </h2>
        <p className="text-sm text-muted-foreground tracking-wider">
          Rewards have been distributed.
        </p>
        <div className="mt-4 text-[var(--gold)] font-display tracking-widest">
          + EXP · + DISCIPLINE · + STREAK
        </div>
      </motion.div>
    </motion.div>
  );
}