export type Exercise = { name: string; sets: string };
export type Workout = {
  id: string;
  title: string;
  subtitle: string;
  emphasis: string;
  rewards: string[];
  exercises: Exercise[];
  rest?: boolean;
};

export const PHASE_1: Workout = {
  id: "phase1",
  title: "Hunter Reawakening Circuit",
  subtitle: "3-Day Foundation Protocol",
  emphasis: "Full Body Adaptation",
  rewards: ["+8 STR", "+10 END", "+15 Discipline"],

  exercises: [

    {
      name: "Bodyweight Squat",
      sets: "3 × 12–15",
    },

    {
      name: "Incline Push-Ups or Knee Push-Ups",
      sets: "3 × 10–12",
    },

    {
      name: "Seated Cable Row",
      sets: "3 × 10–12",
    },

    {
      name: "Dumbbell Romanian Deadlift",
      sets: "3 × 10–12",
    },

    {
      name: "Dumbbell Shoulder Press",
      sets: "2 × 10–12",
    },

    {
      name: "Walking Lunges",
      sets: "2 × 10/leg",
    },

    {
      name: "Lat Pulldown",
      sets: "3 × 10–12",
    },

    {
      name: "Plank Hold",
      sets: "3 × 30–45 sec",
    },

    {
      name: "Treadmill Walk",
      sets: "10 min cooldown",
    },

  ],
};

export const PROGRAM: Workout[] = [
  {
    id: "push-a",
    title: "Push A",
    subtitle: "Chest Emphasis",
    emphasis: "Chest / Shoulders / Triceps",
    rewards: ["+15 STR", "+10 Physique EXP", "+5 Discipline"],
    exercises: [
      { name: "Barbell Bench Press", sets: "4 × 6–8" },
      { name: "Incline Dumbbell Press", sets: "3 × 8–10" },
      { name: "Seated DB Shoulder Press", sets: "3 × 8–10" },
      { name: "Cable Chest Flyes", sets: "3 × 12–15" },
      { name: "Dumbbell Lateral Raises", sets: "4 × 12–15" },
      { name: "Tricep Overhead DB Extension", sets: "3 × 10–12" },
    ],
  },
  {
    id: "pull-a",
    title: "Pull A",
    subtitle: "Width & Upper Back",
    emphasis: "Back / Biceps",
    rewards: ["+15 STR", "+10 Physique EXP", "+5 Discipline"],
    exercises: [
      { name: "Conventional Barbell Deadlift", sets: "3 × 5" },
      { name: "Lat Pulldowns", sets: "3 × 8–10" },
      { name: "Seated Cable Row", sets: "3 × 10–12" },
      { name: "Face Pulls", sets: "3 × 15" },
      { name: "Incline DB Bicep Curls", sets: "3 × 10–12" },
      { name: "Hammer Curls", sets: "3 × 12" },
    ],
  },
  {
    id: "legs-a",
    title: "Legs A",
    subtitle: "Quad Emphasis",
    emphasis: "Quads / Core",
    rewards: ["+18 STR", "+12 Physique EXP", "+5 Discipline"],
    exercises: [
      { name: "Barbell Back Squat", sets: "4 × 6–8" },
      { name: "Romanian Deadlifts", sets: "3 × 8–10" },
      { name: "Leg Press", sets: "3 × 10–12" },
      { name: "Leg Extensions", sets: "3 × 12–15" },
      { name: "Standing Calf Raises", sets: "4 × 15" },
      { name: "Hanging Knee Raises", sets: "3 × Failure" },
    ],
  },
  {
    id: "push-b",
    title: "Push B",
    subtitle: "Shoulder Emphasis",
    emphasis: "Shoulders / Chest / Triceps",
    rewards: ["+15 STR", "+10 Physique EXP", "+5 Discipline"],
    exercises: [
      { name: "Overhead Barbell Press", sets: "4 × 6–8" },
      { name: "Incline Barbell Bench Press", sets: "3 × 8–10" },
      { name: "Dumbbell Flat Bench Press", sets: "3 × 10–12" },
      { name: "Cable Lateral Raises", sets: "4 × 12–15" },
      { name: "Tricep Rope Pushdowns", sets: "3 × 12" },
      { name: "Diamond Push-Ups", sets: "3 × Failure" },
    ],
  },
  {
    id: "pull-b",
    title: "Pull B",
    subtitle: "Thickness & Lower Back",
    emphasis: "Back / Biceps",
    rewards: ["+15 STR", "+10 Physique EXP", "+5 Discipline"],
    exercises: [
      { name: "Bent-Over Barbell Rows", sets: "4 × 6–8" },
      { name: "Pull-Ups or Chin-Ups", sets: "3 × 8–10" },
      { name: "Single-Arm Dumbbell Row", sets: "3 × 10–12" },
      { name: "Reverse Dumbbell Flyes", sets: "3 × 12–15" },
      { name: "Barbell Bicep Curls", sets: "3 × 8–10" },
      { name: "Preacher Curls", sets: "3 × 12" },
    ],
  },
  {
    id: "legs-b",
    title: "Legs B",
    subtitle: "Posterior Chain",
    emphasis: "Glutes / Hamstrings",
    rewards: ["+18 STR", "+12 Physique EXP", "+5 Discipline"],
    exercises: [
      { name: "Barbell Hip Thrusts", sets: "4 × 8–10" },
      { name: "Goblet / Bulgarian Split Squats", sets: "3 × 10–12" },
      { name: "Hamstring Curls", sets: "3 × 12–15" },
      { name: "Seated Calf Raises", sets: "4 × 12–15" },
      { name: "Planks", sets: "3 × 60s" },
    ],
  },
  {
    id: "rest",
    title: "Recovery Day",
    subtitle: "System Cooldown",
    emphasis: "Rest",
    rewards: ["+5 Recovery", "+5 Discipline"],
    rest: true,
    exercises: [
      { name: "Walk 8,000–10,000 steps", sets: "—" },
      { name: "Stretch", sets: "15 min" },
      { name: "Hydrate", sets: "3L water" },
      { name: "Sleep properly", sets: "8 hours" },
    ],
  },
];

export function daysSince(startISO: string): number {
  const start = new Date(startISO);
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - start.getTime()) / 86_400_000);
}

export function getTodayWorkout(startISO: string): Workout {
  const d = Math.max(0, daysSince(startISO));
  if (d < 3) return PHASE_1;
  const idx = (d - 3) % PROGRAM.length;
  return PROGRAM[idx];
}

export const RANKS = ["E", "D", "C", "B", "A", "S"] as const;
export type Rank = typeof RANKS[number];

export function expForLevel(level: number): number {
  return 100 + level * 50;
}

export function rankFromLevel(level: number): Rank {
  if (level >= 50) return "S";
  if (level >= 35) return "A";
  if (level >= 22) return "B";
  if (level >= 12) return "C";
  if (level >= 5) return "D";
  return "E";
}

export const MOTIVATIONAL = [
  "The weak have no rights, no choices. Their only fate is to be relentlessly crushed by the strong.",
  "I alone level up.",
  "Arise.",
  "A hunter's strength is measured by the burdens they bear.",
  "Every rep is a step closer to S Rank.",
  "The System rewards discipline, not motivation.",
  "Hunters do not skip leg day.",
];