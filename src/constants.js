export const MONTH_THEMES = [
  { label: "January",   img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80", accent: "#3B82F6", light: "#EFF6FF", dark: "#1E3A5F" },
  { label: "February",  img: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=900&q=80", accent: "#EC4899", light: "#FDF2F8", dark: "#4A1535" },
  { label: "March",     img: "https://images.unsplash.com/photo-1490750967868-88df5691cc03?w=900&q=80", accent: "#10B981", light: "#ECFDF5", dark: "#064E3B" },
  { label: "April",     img: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=80", accent: "#F59E0B", light: "#FFFBEB", dark: "#451A03" },
  { label: "May",       img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80", accent: "#8B5CF6", light: "#F5F3FF", dark: "#2E1065" },
  { label: "June",      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", accent: "#06B6D4", light: "#ECFEFF", dark: "#083344" },
  { label: "July",      img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80", accent: "#F97316", light: "#FFF7ED", dark: "#431407" },
  { label: "August",    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80", accent: "#EF4444", light: "#FEF2F2", dark: "#450A0A" },
  { label: "September", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80", accent: "#D97706", light: "#FFFBEB", dark: "#451A03" },
  { label: "October",   img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80", accent: "#EA580C", light: "#FFF7ED", dark: "#431407" },
  { label: "November",  img: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=900&q=80", accent: "#7C3AED", light: "#F5F3FF", dark: "#2E1065" },
  { label: "December",  img: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=900&q=80", accent: "#0EA5E9", light: "#F0F9FF", dark: "#0C4A6E" },
];

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const HOLIDAYS = {
  "1-1":   "New Year's Day 🎆",
  "2-14":  "Valentine's Day 💝",
  "3-8":   "Women's Day 👩",
  "4-14":  "Ambedkar Jayanti 🇮🇳",
  "5-1":   "Labour Day 🔨",
  "6-21":  "World Music Day 🎵",
  "8-15":  "Independence Day 🇮🇳",
  "10-2":  "Gandhi Jayanti 🕊️",
  "10-31": "Halloween 🎃",
  "11-14": "Children's Day 👶",
  "12-25": "Christmas 🎄",
  "12-31": "New Year's Eve 🥂",
};

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  const d = new Date(year, month, 1).getDay();
  return (d + 6) % 7; // Monday-based
}

export function sameDay(a, b) {
  return (
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBetween(d, start, end) {
  if (!start || !end) return false;
  const [lo, hi] = start <= end ? [start, end] : [end, start];
  return d > lo && d < hi;
}

export function formatDateShort(d) {
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatRange(start, end) {
  if (!start) return null;
  if (!end) return formatDateShort(start);
  const days = Math.abs(Math.round((end - start) / 86400000)) + 1;
  return `${formatDateShort(start)} → ${formatDateShort(end)}  (${days} day${days !== 1 ? "s" : ""})`;
}
