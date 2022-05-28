import { DateTime } from "luxon";

export function CalculateAge(date: DateTime, now: DateTime): string {
  const diff = date.diff(now, "days").as("days");
  if (!diff || diff > -1) {
    return "Today";
  }
  if (diff === -1) {
    return "Yesterday";
  }
  return Math.ceil(diff) * -1 + " days ago";
}
