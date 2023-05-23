import { IDateProvider } from "../IDateProvider";

import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export class DateProvider implements IDateProvider {
  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  async compareIfBefore(start_date: Date, end_date: Date): Promise<boolean> {
    return dayjs(start_date).isBefore(end_date);
  }
}
