import { HudPanel } from "@/components/system/HudPanel";
import { NeonButton } from "@/components/system/NeonButton";
import type { HunterState } from "@/lib/storage";
import { expForLevel, rankFromLevel } from "@/lib/workouts";

const ALL_ACHIEVEMENTS = [
  { id: "first", name: "First Awakening", desc: "Complete first quest" },
  { id: "streak3", name: "Hunter's Resolve", desc: "3 day streak" },
  { id: "streak7", name: "Unyielding", desc: "7 day streak" },
  { id: "level5", name: "D Rank Ascension", desc: "Reach level 5" },
  { id: "level12", name: "C Rank Ascension", desc: "Reach level 12" },
  { id: "ten", name: "Disciplined", desc: "Complete 10 quests" },
];

export function ProfileScreen({
  hunter,
  onReset,
  onToggleSound,
  onLogout,
}: {
  hunter: HunterState;
  onReset: () => void;
  onToggleSound: () => void;
  onLogout: () => void;
}) {
  const rank = rankFromLevel(hunter.level);
  const expNeed = expForLevel(hunter.level);
  const pct = Math.min(100, (hunter.exp / expNeed) * 100);

  return (
    <div className="px-4 py-6 pb-28 space-y-4 max-w-md mx-auto">
      <HudPanel title="HUNTER PROFILE" glow className="p-6 text-center">
        <div className="relative inline-flex items-center justify-center mb-3">
          <div className="absolute inset-0 -m-2 rounded-full border border-[var(--neon)] animate-pulse-glow" />
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[oklch(0.4_0.2_245)] to-[oklch(0.2_0.05_260)] flex items-center justify-center font-display text-4xl neon-text">
            {hunter.username.charAt(0).toUpperCase() || "H"}
          </div>
        </div>
        <h2 className="font-display text-xl text-foreground">
          {hunter.username || "HUNTER"}
        </h2>
        <div className="text-[10px] tracking-[0.4em] text-muted-foreground mt-1">
          ◆ ID #{(hunter.totalWorkouts * 1337 + 42).toString().padStart(6, "0")}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat label="LEVEL" value={hunter.level} />
          <Stat label="RANK" value={rank} glow />
          <Stat label="STREAK" value={hunter.streak} />
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-[10px] font-display tracking-[0.3em] text-[var(--neon)]/80 mb-1">
            <span>EXP</span>
            <span>{hunter.exp} / {expNeed}</span>
          </div>
          <div className="h-2 rounded-full bg-[oklch(0.78_0.18_235/0.15)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--neon-deep)] to-[var(--neon)] shadow-[0_0_10px_var(--neon)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </HudPanel>

      <HudPanel title="STATISTICS" className="p-5 grid grid-cols-2 gap-4">
        <Stat label="QUESTS DONE" value={hunter.totalWorkouts} />
        <Stat label="ACHIEVEMENTS" value={hunter.achievements.length} />
      </HudPanel>

      <HudPanel title="ACHIEVEMENTS" className="p-4 space-y-2">
        {ALL_ACHIEVEMENTS.map((a) => {
          const unlocked = hunter.achievements.includes(a.id);
          return (
            <div
              key={a.id}
              className={`flex items-center gap-3 border border-[var(--neon-soft)] rounded-sm px-3 py-2 ${
                unlocked
                  ? "bg-[oklch(0.88_0.16_90/0.08)] border-[var(--gold)]/60"
                  : "opacity-40"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-sm flex items-center justify-center font-display ${
                  unlocked ? "text-[var(--gold)]" : "text-muted-foreground"
                }`}
              >
                {unlocked ? "★" : "✦"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm tracking-wide">{a.name}</div>
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground">
                  {a.desc}
                </div>
              </div>
            </div>
          );
        })}
      </HudPanel>

      <HudPanel title="SYSTEM SETTINGS" className="p-5 space-y-5">

        {/* SOUND TOGGLE */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-display tracking-[0.25em] text-muted-foreground">
            ◆ SOUND FX
          </span>

          <button
            onClick={onToggleSound}
            className={`h-7 w-14 rounded-full border relative transition-all ${
              hunter.soundOn
                ? "border-[var(--neon)] bg-[oklch(0.78_0.18_235/0.3)] shadow-[0_0_12px_var(--neon)]"
                : "border-[var(--neon-soft)]"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--neon)] transition-all ${
                hunter.soundOn ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-1 gap-3 pt-2">

          <NeonButton
            variant="danger"
            className="w-full h-[56px] text-sm tracking-[0.3em]"
            onClick={onReset}
          >
            ⚠ RESET HUNTER
          </NeonButton>

          <button
            onClick={onLogout}
            className="
              w-full
              h-[56px]
              rounded-lg
              border
              border-red-500/30
              bg-[rgba(255,0,60,0.06)]
              text-red-400
              font-display
              tracking-[0.28em]
              text-sm
              transition-all
              hover:bg-[rgba(255,0,60,0.12)]
              hover:border-red-400
              hover:shadow-[0_0_18px_rgba(255,0,80,0.25)]
            "
          >
            ⬛ LOGOUT
          </button>

        </div>
      </HudPanel>
    </div>
  );
}

function Stat({
  label,
  value,
  glow = false,
}: {
  label: string;
  value: string | number;
  glow?: boolean;
}) {
  return (
    <div className="border border-[var(--neon-soft)] rounded-sm p-3 bg-[oklch(0.1_0.04_260/0.4)]">
      <div className="text-[10px] font-display tracking-[0.3em] text-muted-foreground">
        {label}
      </div>
      <div
        className={`font-display text-2xl mt-1 ${
          glow ? "text-[var(--gold)] drop-shadow-[0_0_8px_var(--gold)]" : "neon-text"
        }`}
      >
        {value}
      </div>
    </div>
  );
}