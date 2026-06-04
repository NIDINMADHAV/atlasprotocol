import { useState } from "react";

import { saveCurrentUser } from "@/lib/storage";
import { HudPanel } from "@/components/system/HudPanel";
import { NeonButton } from "@/components/system/NeonButton";
import { vibrate } from "@/lib/storage";

export function LoginScreen({
  onLogin,
}: {
  onLogin: (username: string) => void;
}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const handleLogin = () => {
    if (!username.trim()) return;

    vibrate([30, 40, 30]);

    /* SAVE USER IF REMEMBER IS ENABLED */
    if (remember) {
      saveCurrentUser(username.trim());
    }

    onLogin(username.trim());
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">

          <div className="font-display text-[10px] tracking-[0.5em] text-[var(--neon)]/70">
            ━━━ SYSTEM ACCESS ━━━
          </div>

          <h1 className="font-display text-3xl neon-text animate-flicker">
            ARISE, HUNTER
          </h1>

          <p className="text-xs tracking-[0.25em] text-muted-foreground">
            AUTHENTICATE TO ENTER THE SYSTEM
          </p>
        </div>

        {/* LOGIN PANEL */}
        <HudPanel
          title="HUNTER LOGIN"
          glow
          className="p-6 space-y-6"
        >

          {/* USERNAME */}
          <div className="space-y-2">
            <label className="font-display text-[11px] tracking-[0.32em] text-[var(--neon)] block">
              ◆ USERNAME
            </label>

            <input
              autoFocus
              type="text"
              value={username}
              onChange={(e) => {
                console.log("typing:", e.target.value);
                setUsername(e.target.value);
              }}
              placeholder="Enter Hunter Name"
              className="
                h-[58px]
                text-lg
                w-full
              "
              style={{
                pointerEvents: "auto",
                position: "relative",
                zIndex: 10,
                backgroundColor: "oklch(0.1 0.04 260 / 0.6)",
                color: "white",
                border: "1px solid rgba(0, 255, 255, 0.3)",
                padding: "0.75rem 1rem",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="font-display text-[11px] tracking-[0.32em] text-[var(--neon)] block">
              ◆ PASSWORD
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                console.log("password:", e.target.value);
                setPassword(e.target.value);
              }}
              placeholder="••••••••"
              className="
                h-[58px]
                text-lg
                w-full
              "
            />
          </div>

          {/* REMEMBER */}
          <div className="flex items-center justify-between pt-1">

            <span className="text-[11px] tracking-[0.28em] text-muted-foreground font-display">
              REMEMBER HUNTER
            </span>

            <button
              type="button"
              onClick={() => setRemember((r) => !r)}
              className={`relative h-7 w-14 rounded-full border transition-all ${
                remember
                  ? "border-[var(--neon)] bg-[oklch(0.78_0.18_235/0.3)] shadow-[0_0_12px_var(--neon)]"
                  : "border-[var(--neon-soft)] bg-transparent"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--neon)] transition-all ${
                  remember ? "left-8" : "left-1"
                }`}
              />
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <NeonButton
            className="
              w-full
              h-[60px]
              text-sm
              tracking-[0.32em]
              mt-2
            "
            onClick={handleLogin}
          >
            ▶ ENTER THE SYSTEM
          </NeonButton>

        </HudPanel>

        {/* FOOTER */}
        <p className="text-center text-[10px] tracking-[0.3em] text-muted-foreground">
          [ UNAUTHORIZED ACCESS WILL BE TRACED ]
        </p>

      </div>
    </div>
  );
}