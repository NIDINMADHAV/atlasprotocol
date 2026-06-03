import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

import { useRef, useState } from "react";

import { HudPanel } from "@/components/system/HudPanel";
import { NeonButton } from "@/components/system/NeonButton";
import { Typewriter } from "@/components/system/Typewriter";
import { vibrate, playBeep } from "@/lib/storage";

export function DateRegisterScreen({
  onAccept,
  soundOn,
}: {
  onAccept: (iso: string) => void;
  soundOn: boolean;
}) {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);

  const datePickerRef = useRef<any>(null);

  return (
    <div className="min-h-dvh flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">

        <HudPanel
          title="SYSTEM MESSAGE"
          glow
          className="p-6 space-y-5"
        >
          {/* HEADER */}
          <div className="text-center">
            <div className="font-display text-xs tracking-[0.4em] text-[var(--neon)]/70 mb-2">
              ◆ NOTIFICATION ◆
            </div>

            <h2 className="font-display text-xl neon-text">
              HUNTER INITIALIZATION COMPLETE
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm text-center text-muted-foreground tracking-wider leading-relaxed">
            <Typewriter text="Select your training start date. The System will calibrate quests to your journey." />
          </p>

          {/* DATE SECTION */}
<div className="space-y-3">

  <label className="font-display text-[10px] tracking-[0.3em] text-[var(--neon)] block">
    ◆ TRAINING START DATE
  </label>

  {/* DATE ROW */}
  <div className="flex items-center gap-3">

    {/* DATE BOX */}
        <div className="flex-1">

          <DatePicker
            ref={datePickerRef}
            selected={new Date(date)}
            onChange={(selectedDate) => {
              if (selectedDate) {
                setDate(
                  selectedDate
                    .toISOString()
                    .split("T")[0]
                );
              }
            }}
            maxDate={new Date()}
            dateFormat="dd-MM-yyyy"
            calendarClassName="solo-calendar"
            customInput={
              <button
                type="button"
                className="
                  w-full
                  h-[68px]
                  rounded-xl
                  border
                  border-cyan-400/35
                  bg-[oklch(0.1_0.04_260/0.7)]
                  px-5
                  text-left
                  text-white
                  text-[20px]
                  tracking-[0.12em]
                  shadow-[0_0_14px_rgba(0,255,255,0.12)]
                  hover:border-cyan-300
                  transition-all
                "
              >
                {date.split("-").reverse().join("-")}
              </button>
            }
          />

        </div>

        {/* CALENDAR BUTTON */}
        <button
          type="button"
          onClick={() => {
            datePickerRef.current?.setOpen(true);
          }}
          className="
            h-[68px]
            w-[68px]
            shrink-0
            rounded-xl
            border
            border-cyan-400/35
            bg-[oklch(0.1_0.04_260/0.7)]
            flex
            items-center
            justify-center
            text-cyan-400
            shadow-[0_0_14px_rgba(0,255,255,0.15)]
            hover:border-cyan-300
            hover:shadow-[0_0_22px_rgba(0,255,255,0.28)]
            transition-all
          "
        >
          <CalendarDays size={28} />
        </button>

      </div>

      {/* GAP BEFORE BUTTON */}
      <div className="pt-2" />

    </div>

          {/* ACCEPT BUTTON */}
          <NeonButton
            className="w-full"
            onClick={() => {
              vibrate([20, 30, 50]);
              playBeep(soundOn);
              onAccept(date);
            }}
          >
            ✦ ACCEPT QUEST
          </NeonButton>

        </HudPanel>
      </div>
    </div>
  );
}