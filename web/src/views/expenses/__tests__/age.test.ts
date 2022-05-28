import { DateTime } from "luxon";

import { CalculateAge } from "../age";

describe("verify dates", () => {
  it("should return 'Today'", () => {
    const date = DateTime.fromISO("2022-05-28T04:52:13");
    const now = DateTime.fromISO("2022-05-28T04:52:13");
    const diff = CalculateAge(date, now);
    expect(diff).toEqual("Today");
  });

  it("should return '2 days ago'", () => {
    const date = DateTime.fromISO("2022-05-27T04:52:13");
    const now = DateTime.fromISO("2022-05-29T04:52:13");
    const diff = CalculateAge(date, now);
    expect(diff).toEqual("2 days ago");
  });
  it("should return 'Yesterday'", () => {
    const date = DateTime.fromISO("2022-05-28T04:52:13");
    const now = DateTime.fromISO("2022-05-29T04:52:13");
    const diff = CalculateAge(date, now);
    expect(diff).toEqual("Yesterday");
  });
});
