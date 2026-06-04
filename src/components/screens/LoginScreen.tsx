import { useState } from "react";

import { saveCurrentUser, vibrate } from "@/lib/storage";
import { HudPanel } from "@/components/system/HudPanel";
import { NeonButton } from "@/components/system/NeonButton";

export function LoginScreen({
  onLogin,
}: {
  onLogin: (username: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [remember, setRemember] = useState(true);

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return;

    vibrate([30, 40, 30]);

    if (remember) {
      saveCurrentUser(trimmedUsername);
    }

    onLogin(trimmedUsername);
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md space-y-6">
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

        <HudPanel title="HUNTER LOGIN" glow className="p-6 space-y-6">
          <form
            className="space-y-6"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="space-y-2">
              <label
                htmlFor="hunter-username"
                className="font-display text-[11px] tracking-[0.32em] text-[var(--neon)] block"
              >
                ◆ USERNAME
              </label>

              <input
                id="hunter-username"
                name="hunter_username"
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Hunter Name"
                className="h-[58px] w-full text-lg"
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

            <div className="space-y-2">
              <label
                htmlFor="hunter-passcode"
                className="font-display text-[11px] tracking-[0.32em] text-[var(--neon)] block"
              >
                ◆ PASSCODE
              </label>

              <input
                id="hunter-passcode"
                name="hunter_passcode"
                type="password"
                autoComplete="new-password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="h-[58px] w-full text-lg"
                style={{
                  backgroundColor: "oklch(0.1 0.04 260 / 0.6)",
                  color: "white",
                  border: "1px solid rgba(0, 255, 255, 0.3)",
                  padding: "0.75rem 1rem",
                }}
              />
            </div>

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
                aria-pressed={remember}
                aria-label="Toggle remember hunter"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--neon)] transition-all ${
                    remember ? "left-8" : "left-1"
                  }`}
                />
              </button>
            </div>

            <NeonButton
              className="w-full h-[60px] text-sm tracking-[0.32em] mt-2"
              onClick={handleLogin}
            >
              ▶ ENTER THE SYSTEM
            </NeonButton>
          </form>
        </HudPanel>

        <p className="text-center text-[10px] tracking-[0.3em] text-muted-foreground">
          [ UNAUTHORIZED ACCESS WILL BE TRACED ]
        </p>
      </div>
    </div>
  );
}