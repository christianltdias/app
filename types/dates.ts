
export type DayOfMonth = {
  day: number,
  month: number,
  year: number,
  dayOfWeek: DayOfWeek,
}

export enum DayOfWeek {
  Sunday = 'Su',
  Monday = 'Mo',
  Tuesday = 'Tu',
  Wednesday = 'We',
  Thursday = 'Th',
  Friday = 'Fr',
  Saturday = 'Sa',
}

export enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}