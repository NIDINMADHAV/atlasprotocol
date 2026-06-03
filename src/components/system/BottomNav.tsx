type Tab = "quest" | "profile";

export function BottomNav({
  tab,
  onChange,
}: {
  tab: Tab;
  onChange: (t: Tab) => void;
}) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: "quest", label: "QUEST", icon: "◈" },
    { id: "profile", label: "HUNTER", icon: "◆" },
  ];
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-md px-4 pb-3">
        <div className="hud-panel hud-bracket flex p-1">
          {items.map((it) => {
            const active = tab === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onChange(it.id)}
                className={`flex-1 py-3 font-display text-[11px] tracking-[0.3em] rounded-sm transition-all ${
                  active
                    ? "bg-[oklch(0.78_0.18_235/0.25)] text-[var(--neon)] shadow-[inset_0_0_12px_oklch(0.82_0.2_230/0.4)]"
                    : "text-muted-foreground hover:text-[var(--neon)]"
                }`}
              >
                <span className="mr-1">{it.icon}</span> {it.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}