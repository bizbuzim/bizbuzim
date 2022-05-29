import { DateTime } from "luxon";

export function CalculateAge(date: DateTime, now: DateTime): string {
  const diff = date.diff(now, "days").as("days");
  if (!diff || diff > -1) {
    if (now.get("day") === date.get("day")) return "Today";
    return "Yesterday";
  }
  if (diff === -1) {
    return "Yesterday";
  }
  return Math.round(diff * -1) + " days ago";
}
