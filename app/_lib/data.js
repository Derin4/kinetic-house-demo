// Fictitious data for the Kinetic House demo. Nothing here is a real gym,
// real people, or a real price.

export const SHOP = {
  name: "Kinetic House",
  street: "52 Foundry Lane",
  area: "Old Mill District",
  hours: "Open daily, 6am–8pm",
  open: 6,
  close: 20,
};

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const dayNames = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

// Group and effort level (1 easy to 5 hard) for each class name.
export const CLASS_INFO = {
  "Strength Foundations": { group: "Strength", level: 2 },
  "Express Strength": { group: "Strength", level: 3 },
  "Olympic Lifting": { group: "Strength", level: 4 },
  "Metabolic Conditioning": { group: "Conditioning", level: 4 },
  "Mobility & Flow": { group: "Mobility", level: 1 },
  "Recovery & Stretch": { group: "Mobility", level: 1 },
  "Boxing Fundamentals": { group: "Boxing", level: 3 },
  "Open Gym Coaching": { group: "Open gym", level: 2 },
};
export const GROUPS = [
  "Strength",
  "Conditioning",
  "Mobility",
  "Boxing",
  "Open gym",
];

const c = (time, name, trainer, total, filled) => ({
  time,
  name,
  trainer,
  total,
  filled,
  ...CLASS_INFO[name],
});

// Fictitious weekly class schedule with capacity per class.
export const schedule = {
  Mon: [
    c("6:00 AM", "Strength Foundations", "Cole", 12, 9),
    c("12:15 PM", "Express Strength", "Cole", 10, 6),
    c("5:30 PM", "Metabolic Conditioning", "Priya", 16, 16),
  ],
  Tue: [
    c("7:00 AM", "Mobility & Flow", "Aisha", 14, 6),
    c("12:15 PM", "Metabolic Conditioning", "Priya", 16, 10),
    c("6:00 PM", "Olympic Lifting", "Cole", 8, 5),
  ],
  Wed: [
    c("6:00 AM", "Strength Foundations", "Cole", 12, 10),
    c("12:15 PM", "Mobility & Flow", "Aisha", 14, 5),
    c("5:30 PM", "Metabolic Conditioning", "Priya", 16, 12),
  ],
  Thu: [
    c("7:00 AM", "Mobility & Flow", "Aisha", 14, 4),
    c("12:15 PM", "Express Strength", "Cole", 10, 4),
    c("6:00 PM", "Boxing Fundamentals", "Marcus", 10, 10),
  ],
  Fri: [
    c("6:00 AM", "Strength Foundations", "Cole", 12, 7),
    c("12:15 PM", "Boxing Fundamentals", "Marcus", 10, 7),
    c("5:30 PM", "Open Gym Coaching", "Priya", 20, 8),
  ],
  Sat: [
    c("9:00 AM", "Metabolic Conditioning", "Marcus", 16, 13),
    c("10:30 AM", "Mobility & Flow", "Aisha", 14, 9),
    c("12:00 PM", "Open Gym Coaching", "Priya", 20, 6),
  ],
  Sun: [
    c("10:00 AM", "Recovery & Stretch", "Aisha", 14, 3),
    c("4:00 PM", "Strength Foundations", "Cole", 12, 5),
  ],
};

export const membership = [
  {
    id: "drop-in",
    name: "Drop-In",
    price: 28,
    period: "per class",
    features: [
      "Access to any single class",
      "No commitment",
      "Good for visitors",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 165,
    period: "/ month",
    highlighted: true,
    features: [
      "Unlimited classes",
      "Priority booking (24 hrs early)",
      "Guest pass, 1 per month",
      "Access to open gym hours",
    ],
  },
  {
    id: "foundation",
    name: "3x / Week",
    price: 120,
    period: "/ month",
    features: [
      "3 classes per week",
      "Standard booking window",
      "Access to open gym hours",
    ],
  },
];

export const trainers = [
  {
    id: "cole",
    name: "Cole Ferris",
    first: "Cole",
    focus: "Strength & Olympic Lifting",
    tone: "#E5572D",
    pic: "coach-cole",
    years: 11,
    bio: "Cole programs every strength class himself and keeps a notebook on every regular. He will tell you to drop the weight before he lets your form slip.",
    quote: "If I can't see your hips, the weight is too heavy.",
  },
  {
    id: "priya",
    name: "Priya Anand",
    first: "Priya",
    focus: "Conditioning & Open Gym",
    tone: "#5B6067",
    pic: "coach-priya",
    years: 9,
    bio: "Priya builds conditioning sessions that are hard without being chaotic. She also runs open gym coaching, so you can ask her anything between sets.",
    quote: "Hard is fine. Sloppy is not.",
  },
  {
    id: "aisha",
    name: "Aisha Boone",
    first: "Aisha",
    focus: "Mobility & Recovery",
    tone: "#17181A",
    pic: "coach-aisha",
    years: 8,
    bio: "Aisha teaches the classes most people skip and then thank her for. Her mobility work is why half the gym lifts better than they did last year.",
    quote: "You can't train what you can't move.",
  },
  {
    id: "marcus",
    name: "Marcus Reid",
    first: "Marcus",
    focus: "Boxing & Conditioning",
    tone: "#B84A26",
    pic: "coach-marcus",
    years: 10,
    bio: "Marcus teaches boxing from the ground up: stance, footwork, then the punches. Nobody gets hit, and everybody leaves with sore shoulders.",
    quote: "Footwork first. Everything else is decoration.",
  },
];

export const programs = [
  {
    id: "strength",
    group: "Strength",
    name: "Strength",
    tag: "Squat, press, pull",
    text: "Barbell and dumbbell training taught from the basics up. Capped small, so your coach sees every rep.",
    pic: "program-strength",
    tone: ["#5B6067", "#17181A"],
  },
  {
    id: "conditioning",
    group: "Conditioning",
    name: "Conditioning",
    tag: "Sweat, safely",
    text: "Timed rounds that raise your heart rate without wrecking your technique. Scaled for every level.",
    pic: "program-conditioning",
    tone: ["#E5572D", "#17181A"],
  },
  {
    id: "mobility",
    group: "Mobility",
    name: "Mobility",
    tag: "Move better",
    text: "Flow, stretch and recovery sessions that keep you training for the long run.",
    pic: "program-mobility",
    tone: ["#8A8F96", "#2A2C2F"],
  },
  {
    id: "boxing",
    group: "Boxing",
    name: "Boxing",
    tag: "Stance to combination",
    text: "Technique-first boxing on bags and pads. No sparring and no experience needed.",
    pic: "program-boxing",
    tone: ["#B84A26", "#17181A"],
  },
];

export const STATS = [
  { to: 12, decimals: 0, suffix: "", label: "average class size" },
  {
    to: 4,
    decimals: 0,
    suffix: "",
    label: "coaches who write their own classes",
  },
  { to: 14, decimals: 0, suffix: " hrs", label: "open every day" },
];

export const GALLERY = [
  {
    id: "floor-1",
    label: "The main floor",
    tone: ["#5B6067", "#17181A"],
    span: "col-span-2 row-span-2",
  },
  { id: "floor-2", label: "Rack bay", tone: ["#E5572D", "#17181A"], span: "" },
  {
    id: "floor-3",
    label: "Boxing corner",
    tone: ["#8A8F96", "#2A2C2F"],
    span: "",
  },
  {
    id: "floor-4",
    label: "Mobility room",
    tone: ["#B84A26", "#17181A"],
    span: "",
  },
  {
    id: "floor-5",
    label: "Warm-up lane",
    tone: ["#5B6067", "#2A2C2F"],
    span: "",
  },
  {
    id: "floor-6",
    label: "Open gym",
    tone: ["#E5572D", "#5B6067"],
    span: "col-span-2 sm:col-span-4",
  },
];

export const reviews = [
  {
    name: "Dani R.",
    plan: "Unlimited",
    quote:
      "Coach Cole corrected my squat in week one and again in week twelve. Nobody has ever done that for me at a gym.",
  },
  {
    name: "Mateo L.",
    plan: "3x / Week",
    quote:
      "I booked the free class expecting to feel lost. I was the one being asked about my shoulder before we started.",
  },
  {
    name: "Hannah T.",
    plan: "Unlimited",
    quote:
      "The classes are small enough that the coach knows your name by the second visit. That is the whole difference.",
  },
  {
    name: "Obi A.",
    plan: "Drop-In",
    quote:
      "Passing through town and booked a drop-in. Felt like a regular by the end of the warm-up.",
  },
  {
    name: "Sophie K.",
    plan: "3x / Week",
    quote:
      "Aisha's mobility class fixed the back pain I had been ignoring for years. I did not expect that from a stretch class.",
  },
  {
    name: "Ravi P.",
    plan: "Unlimited",
    quote:
      "Priya's conditioning is the hardest hour of my week and the one I look forward to most.",
  },
];

export const FAQS = [
  {
    q: "Is the first class really free?",
    a: "Yes. Pick any class with spots left and book it from the free trial page. There is no card required and no sales call afterwards.",
  },
  {
    q: "I have never trained before. Is that okay?",
    a: "That is who we built Strength Foundations and Mobility & Flow for. Tell your coach it is your first time and they will adjust everything.",
  },
  {
    q: "What should I bring?",
    a: "Water, a towel and shoes you can lift in. We provide the barbells, plates, bags and mats.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes, up to four hours before class at no charge. After that the spot counts as used, because someone else could have had it.",
  },
  {
    q: "Are there contracts?",
    a: "No. Monthly plans can be cancelled or paused with two weeks' notice.",
  },
];
