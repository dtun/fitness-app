export let scheduleA = `~4-8 repetitions (heavier weights) and 3-4 sets per exercise with 2-4 minutes rest between sets`;

export let scheduleB = `~8-15 repetitions (moderate-lighter weights) and 2-3 sets per exercise with ~90 seconds rest between sets`;

export let protocolMap = {
  "1": {
    id: "1",
    focus: "Long Endurance",
    description: [
      `>30 minutes Zone 2 cardio, ideally 60-75 minutes (work up to it)`,
      `Zone 2 cardio: breathing faster than normal, but just able to maintain a conversation`,
      `Aim for 180-200 minutes of Zone 2 cardio per week`,
    ],
    exerciseExamples: [
      `Jogging, rowing, cycling, swimming, hiking`,
      `Increase difficulty using a weighted vest or backpack`,
      `Emphasize nasal breathing, when possible`,
    ],
  },
  "2": {
    id: "2",
    focus: "Legs Resistance",
    description: [
      `10-minute warmup + 50-60 minutes training`,
      // `Alternate Schedule A & B monthly`,
    ],
    exerciseExamples: [
      `Muscle Group: Lengthened Position/Shortened Position`,
      `Quadriceps: leg extension/hack squats`,
      `Hamstrings: leg curls/glute-ham-raises`,
      `Calves: standing raises/seated raises`,
    ],
  },
  "3": {
    id: "3",
    focus: "Heat/Cold Exposure & Recovery",
    description: [
      `Sauna (20 minutes) + Ice Bath/Cold Shower (5 minutes) repeat 3-5x`,
      `Start slowly when using deliberate heat & cold exposure`,
    ],
    exerciseExamples: [],
  },
  "4": {
    id: "4",
    focus: "Torso & Neck Resistance",
    description: [
      `10-minute warmup + 50-60 minutes training`,
      `Push/Pull Training`,
      `Alternate Schedule A & B monthly`,
      `Commonly overlooked; however specifically training the neck will reduce risk of injury and correct posture`,
    ],
    schedule: [
      {
        name: "A",
        description: scheduleA,
      },

      {
        name: "B",
        description: scheduleB,
      },
    ],
    exerciseExamples: [
      `Muscle Group: Lengthened Position/Shortened Position`,
      `Chest: incline press/cable crossover`,
      `Back: chin-up or pull-up/seated row or dumbbell row`,
      `Shoulders: shoulder press/lateral raises, rear deltoid flies`,
      `Neck exercises`,
    ],
  },
  "5": {
    id: "5",
    focus: "Cardio",
    description: [
      `35 minutes of moderate intensity cardio`,
      `75-80% of maximum effort`,
    ],
    exerciseExamples: [
      `Running, rowing, cycling, jumping jacks, stair-climb, jump rope — ideally done outside`,
    ],
  },
  "6": {
    id: "6",
    focus: "High Intensity Interval Training",
    description: [
      `20-60 seconds all-out sprint + 10 seconds rest x 8-12 rounds`,
      `Sprint: try to get to maximum heart rate`,
      `Max. Heart Rate = 220 minus your age`,
    ],
    exerciseExamples: [
      `Assault bike, sprint/jog intervals, rowing, skiing machine, sand sprints`,
      `Important: pick an exercise that you can do with perfect form, to prevent injury`,
    ],
  },
  "7": {
    id: "7",
    focus: "Arms, Neck, & Calves",
    description: [
      `10-minute warmup + 50-60 minutes training`,
      `Alternate Schedule A & B monthly`,
      `Indirectly trains torso (especially if you include dips)`,
    ],
    schedule: [
      {
        name: "A",
        description: scheduleA,
      },
      {
        name: "B",
        description: scheduleB,
      },
    ],
    exerciseExamples: [
      `Muscle Group: Lengthened Position/Shortened Position`,
      `Biceps: incline curl/dumbbell curls`,
      `Triceps: overhead extensions/triceps dips or regular dips`,
      `Calves: standing calf raise/seated calf raise, tibialis raises`,
      `Neck exercises`,
    ],
  },
};
