export interface IDateProvider {
  convertToUTC(date: Date): string;
  dateNow(): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): Promise<boolean>;
}
