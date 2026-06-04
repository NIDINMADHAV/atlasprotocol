import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Particles } from "@/components/system/Particles";
import { BottomNav } from "@/components/system/BottomNav";
import { LevelUpOverlay } from "@/components/system/LevelUpOverlay";
import { BootScreen } from "@/components/screens/BootScreen";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { DateRegisterScreen } from "@/components/screens/DateRegisterScreen";
import { QuestScreen } from "@/components/screens/QuestScreen";
import { TrackingScreen } from "@/components/screens/TrackingScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import {
  DEFAULT_HUNTER,
  todayKey,
  useLocal,
  type HunterState,
} from "@/lib/storage";
import {
  daysSince,
  expForLevel,
  getTodayWorkout,
  rankFromLevel,
} from "@/lib/workouts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solo System — Hunter Training" },
      {
        name: "description",
        content:
          "Train like a Solo Leveling hunter. Daily holographic quests, EXP, ranks E to S.",
      },
      { property: "og:title", content: "Solo System — Hunter Training" },
      {
        property: "og:description",
        content: "A futuristic gym quest system inspired by Solo Leveling.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("solo_leveling_current_user") || ""
  );
  const [hunter, setHunter] = useLocal<HunterState>(
    currentUser
      ? `sl-hunter-${currentUser}`
      : "sl-temp",
    DEFAULT_HUNTER
  );
  const [booted, setBooted] = useState(false);
  const [mode, setMode] = useState<"quest" | "tracking">("quest");
  const [tab, setTab] = useState<"quest" | "profile">("quest");
  const [levelUp, setLevelUp] = useState<{
    show: boolean;
    level: number;
    rank: string;
    rankUp: boolean;
  }>({ show: false, level: 1, rank: "E", rankUp: false });

  const dayNumber = hunter.startDate ? Math.max(0, daysSince(hunter.startDate)) : 0;
  const workout = useMemo(
    () => (hunter.startDate ? getTodayWorkout(hunter.startDate) : null),
    [hunter.startDate],
  );

  // Daily streak rollover check
  useEffect(() => {
    if (!hunter.lastCompleted) return;
    const last = new Date(hunter.lastCompleted);
    const today = new Date(todayKey());
    const gap = Math.floor(
      (today.getTime() - last.getTime()) / 86_400_000,
    );
    if (gap > 1 && hunter.streak !== 0) {
      setHunter((h) => ({ ...h, streak: 0 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!booted) {
    return (
      <>
        {/* <Particles /> */}
        <BootScreen onDone={() => setBooted(true)} />
      </>
    );
  }

  if (!currentUser || !hunter.username) {
    return (
      <>
        {/* <Particles /> */}
        <LoginScreen
          onLogin={(username) => {

          const existingData = localStorage.getItem(
            `sl-hunter-${username}`
          );

          setCurrentUser(username);

          /* EXISTING USER */
          if (existingData) {
            const parsed = JSON.parse(existingData);

            setHunter(parsed);

            return;
          }

          /* NEW USER */
          const freshHunter = {
            ...DEFAULT_HUNTER,
            username,
          };

          setHunter(freshHunter);

          localStorage.setItem(
            `sl-hunter-${username}`,
            JSON.stringify(freshHunter)
          );
        }}
        />
      </>
    );
  }

  if (!hunter.startDate) {
    return (
      <>
        <Particles />
        <DateRegisterScreen
          soundOn={hunter.soundOn}
          onAccept={(iso) => setHunter((h) => ({ ...h, startDate: iso }))}
        />
      </>
    );
  }

  const todayDone = hunter.lastCompleted === todayKey();

  function onComplete(durationMin: number) {
    setHunter((h) => {
      const prevLevel = h.level;
      const prevRank = rankFromLevel(prevLevel);
      const gained = 40 + durationMin * 2;
      let exp = h.exp + gained;
      let level = h.level;
      while (exp >= expForLevel(level)) {
        exp -= expForLevel(level);
        level += 1;
      }
      const newRank = rankFromLevel(level);
      const totalWorkouts = h.totalWorkouts + 1;
      // streak: +1 if completed yesterday or first time today
      const last = h.lastCompleted ? new Date(h.lastCompleted) : null;
      const today = new Date(todayKey());
      let streak = h.streak;
      if (!last) streak = 1;
      else {
        const gap = Math.floor((today.getTime() - last.getTime()) / 86_400_000);
        if (gap === 0) streak = h.streak; // already counted today (shouldn't hit)
        else if (gap === 1) streak = h.streak + 1;
        else streak = 1;
      }
      // achievements
      const ach = new Set(h.achievements);
      ach.add("first");
      if (streak >= 3) ach.add("streak3");
      if (streak >= 7) ach.add("streak7");
      if (level >= 5) ach.add("level5");
      if (level >= 12) ach.add("level12");
      if (totalWorkouts >= 10) ach.add("ten");

      if (level > prevLevel) {
        setLevelUp({
          show: true,
          level,
          rank: newRank,
          rankUp: newRank !== prevRank,
        });
      }

      return {
        ...h,
        exp,
        level,
        totalWorkouts,
        streak,
        lastCompleted: todayKey(),
        achievements: Array.from(ach),
      };
    });
    setMode("quest");
  }

  return (
    <>
      <Particles />
      <AnimatePresence mode="wait">
        {tab === "profile" ? (
          <div key="profile">
            <ProfileScreen
              hunter={hunter}
              onToggleSound={() =>
                setHunter((h) => ({ ...h, soundOn: !h.soundOn }))
              }
              onReset={() => {
                if (
                  confirm(
                    "[SYSTEM] Erase hunter data? This action cannot be undone.",
                  )
                ) {
                  setBooted(false);
                  setTab("quest");
                }
              }}
              onLogout={() => {
                localStorage.removeItem(
                  "solo_leveling_current_user"
                );

                setCurrentUser("");

                setTab("quest");
              }}
            />
          </div>
        ) : mode === "tracking" && workout && !workout.rest ? (
          <div key="tracking">
            <TrackingScreen
              workout={workout}
              soundOn={hunter.soundOn}
              onComplete={onComplete}
              onBack={() => setMode("quest")}
            />
          </div>
        ) : (
          <div key="quest">
            {workout && (
              <QuestScreen
                workout={workout}
                username={hunter.username}
                dayNumber={dayNumber}
                soundOn={hunter.soundOn}
                alreadyDone={todayDone}
                onAccept={() => {
                  if (workout.rest) {
                    onComplete(10);
                  } else {
                    setMode("tracking");
                  }
                }}
                onDelay={() => {
                  // small confirmation feel
                }}
              />
            )}
          </div>
        )}
      </AnimatePresence>
      <BottomNav tab={tab} onChange={setTab} />
      <LevelUpOverlay
        show={levelUp.show}
        level={levelUp.level}
        rank={levelUp.rank}
        rankUp={levelUp.rankUp}
        onDone={() => setLevelUp((l) => ({ ...l, show: false }))}
      />
    </>
  );
}
