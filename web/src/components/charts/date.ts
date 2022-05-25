import { Interval, DateTime } from "luxon";

export function buildDates(from: DateTime, to: DateTime): string[] {
  const res = [];
  const interval = Interval.fromDateTimes(from, to);
  let cursor = interval.start.startOf("day");
  while (cursor < interval.end) {
    res.push(cursor.toFormat("dd/MM/yyyy"));
    cursor = cursor.plus({ days: 1 });
  }
  return res;
}

export function formatISODate(date: string): string {
  return DateTime.fromISO(date).toFormat("dd/MM/yyyy");
}
