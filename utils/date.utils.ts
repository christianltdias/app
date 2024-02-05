import { DayOfMonth, DayOfWeek } from "../types/dates";
import { convertArrayToMatrix } from "./array.utils";
import { getEnumByIndex } from "./enum.utils";

export const maskDate = (previous: string, value: string): string => {
  var key: string = value.slice(-1);
  var index: number;

  if (value.length < previous.length) {
    return value;
  }

  for (index = 0; index < previous.length; index++) {
    if (value[index] !== previous[index]) {
      key = value[index]
      break;
    }
  }

  var correctValue = value.replaceAll('/', '');
  var len = correctValue.length;


  if (correctValue.length > 8) {
    return correctValue.slice(0, -1);
  }

  var result = correctValue;

  if (key === '/') {
    if (len === 1) {
      result = `0${correctValue.slice(-1)}`
    } else if (len === 3) {
      result = `${correctValue.slice(0, -1)}0${correctValue.slice(-1)}`
    }

    return result;
  }

  return result;
}

export const getDate = (dateStr: string): Date => {
  const date = Date.parse(dateStr);
  if (!isNaN(date)) {
    return new Date(date);
  }

  return new Date();
}

export function createMonthArray(
  month: number,
  year: number
): Array<DayOfMonth> {
  const arrayOfDays: Array<DayOfMonth> = []
  const firstDay = createDate(1, month, year);
  const firstDayIndex = firstDay.getDay();
  const numOfDaysCurrentMonth = numDays(year, month);
  const numOfDaysPreviousMonth = firstDayIndex === 0 ? 0 : numDays(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1);

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    arrayOfDays.push(
      {
        day: numOfDaysPreviousMonth - i,
        year: month === 0 ? year - 1 : year,
        month: month === 0 ? 11 : month - 1,
        dayOfWeek: getEnumByIndex(DayOfWeek, Math.abs(i + 1 - firstDayIndex)),
      });
  }
  var aux = firstDayIndex
  for (let i = 1; i <= numOfDaysCurrentMonth; i++) {
    arrayOfDays.push({
      day: i,
      year: year,
      month: month,
      dayOfWeek: getEnumByIndex(DayOfWeek, aux++),
    });
    if (aux > 6) {
      aux = 0;
    }
  }

  const reaminingDays = 7 * 6 - arrayOfDays.length;
  for (let i = 1; i <= reaminingDays; i++) {
    arrayOfDays.push({
      day: i,
      year: month === 11 ? year + 1 : year,
      month: month === 11 ? 0 : month + 1,
      dayOfWeek: getEnumByIndex(DayOfWeek, aux++),
    });
    if (aux > 6) {
      aux = 0;
    }
  }

  return arrayOfDays;
}

export function createMonthMatrix(
  month: number,
  year: number
): Array<Array<DayOfMonth>> {
  const arrayOfDays = createMonthArray(month, year);
  return convertArrayToMatrix<DayOfMonth>(arrayOfDays, 7);
}

export const numDays = (year: number, month: number) => createDate(0, month + 1, year).getDate();

export const numDaysOfDate = (date: Date) => date.getDate();

export const isDateValid = (date: string): boolean => {
  let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

  if (date.match(dateformat)) {
    let operator = date.split('/');

    let datepart = [];
    if (operator.length > 1) {
      datepart = date.split('/');
    }
    let day = parseInt(datepart[0]);
    let month = parseInt(datepart[1]);
    let year = parseInt(datepart[2]);

    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month == 1 || (month > 2 && month <= 12)) {
      if (day > ListofDays[month - 1]) {
        return false;
      }
    } else if (month == 2) {
      let leapYear = false;
      if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
      if ((leapYear == false) && (day >= 29)) {
        return false;
      }
      else
        if ((leapYear == true) && (day > 29)) {
          return false;
        }
    } else {
      return false;
    }
  } else {
    return false;
  }
  return true;
}

export const createDate = (day: number, month: number, year: number) => new Date(year, month, day)