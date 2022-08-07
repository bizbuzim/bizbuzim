import { DateTime } from "luxon";

export function CalculateAge(date: DateTime, now: DateTime): string {
  const diff = date.diff(now, "days").as("days");
  if (!diff) {
    return "Today";
  }
  if (now.get("day") === date.get("day")) return "Today";
  const r = Math.round(diff);
  if (r > 0) {
    return `In ${r} days`;
  }
  if (r === -1) {
    return "Yesterday";
  }
  return r * -1 + " days ago";
}
