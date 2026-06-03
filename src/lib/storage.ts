import { useEffect, useState } from "react";

export function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}

export type HunterState = {
  username: string;
  startDate: string | null;
  level: number;
  exp: number;
  totalWorkouts: number;
  streak: number;
  lastCompleted: string | null; // YYYY-MM-DD
  achievements: string[];
  soundOn: boolean;
};

export const DEFAULT_HUNTER: HunterState = {
  username: "",
  startDate: null,
  level: 1,
  exp: 0,
  totalWorkouts: 0,
  streak: 0,
  lastCompleted: null,
  achievements: [],
  soundOn: true,
};

export function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function playBeep(soundOn: boolean) {
  if (!soundOn || typeof window === "undefined") return;
  try {
    const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = "sine";
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12);
    g.gain.setValueAtTime(0.15, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    o.start();
    o.stop(ctx.currentTime + 0.4);
  } catch {}
}

export function vibrate(pattern: number | number[] = 30) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(pattern); } catch {}
  }
}const CURRENT_USER_KEY = "solo_leveling_current_user";

export function saveCurrentUser(username: string) {
  localStorage.setItem(
    CURRENT_USER_KEY,
    username
  );
}

export function getCurrentUser() {
  return localStorage.getItem(
    CURRENT_USER_KEY
  );
}

export function logoutCurrentUser() {
  localStorage.removeItem(
    CURRENT_USER_KEY
  );
}