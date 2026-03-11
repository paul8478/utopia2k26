export interface ScheduleEvent {
  time: string;
  title: string;
  day: string;
  artist: string;
  image: string;
}

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  {
    time: "16:00",
    title: "GATES OPEN · GROUNDING RAGA",
    day: "DAY 01",
    artist: "Ananya Devi Ensemble",
    image:
      "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "17:30",
    title: "TEMPLE RHYTHMS · MRIDANGAM CYCLE",
    day: "DAY 01",
    artist: "Rohit Iyer Collective",
    image:
      "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "19:00",
    title: "CLASSICAL FUSION · RAGA x SYNTH",
    day: "DAY 01",
    artist: "Synaptic Raga",
    image:
      "https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "21:00",
    title: "NEON ASCENT · OPENING SET",
    day: "DAY 02",
    artist: "VOID.EXE",
    image:
      "https://images.pexels.com/photos/1647161/pexels-photo-1647161.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "23:00",
    title: "ACID GREEN CIRCUIT · LIVE AV",
    day: "DAY 02",
    artist: "Neural Drift",
    image:
      "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    time: "01:00",
    title: "ULTRA-LATE RITUAL · FINAL DESCENT",
    day: "DAY 02",
    artist: "Bass Temple",
    image:
      "https://images.pexels.com/photos/1938866/pexels-photo-1938866.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "ARA NØVA",
    role: "Creative Director",
    image:
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "DEV CHANDRA",
    role: "Technical Lead",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "MEI KASUMI",
    role: "Experience Architect",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "LIO RAY",
    role: "Music Curator",
    image:
      "https://images.pexels.com/photos/2837009/pexels-photo-2837009.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "SANA QADIR",
    role: "Production Lead",
    image:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];
