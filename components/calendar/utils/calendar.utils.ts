import { Month } from "../../../types/dates";
import { getEnumByIndex } from "../../../utils/enum.utils";
import { CalendarCell, CalendarEvent } from "../types/calendar.types";

export const getHeight = (event: CalendarEvent, height: number, factor: number, margin: number): number => {
  var eventSize = (height * factor) * (event.duration / 60) - 2 * margin;
  return eventSize
};

export const getTop = (initialDate: Date, height: number, factor: number, margin: number): number => {
  const minutes = CalendarEvent.getDuration(new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate()), initialDate);
  return (height * factor) * (minutes / 60) + margin;
};

export const getDayName = (currentDay: Date) => {
  return `${currentDay.getDate()} ${Month[getEnumByIndex<string>(Month, currentDay.getMonth())]} ${currentDay.getFullYear()}`
}

export const createCalendarDayCells = (date: Date, factor: number, events: Array<CalendarEvent>): Array<CalendarCell> => {
  var calendarCells: Array<CalendarCell> = [];
  const hoursArray = Array.from(Array(24 * factor).keys())
  var hours = 0
  var minutes = 0
  for(let i = 0; i < hoursArray.length; i++) {
    const initialDate = cloneDate(date, hours, minutes);
    ({hours, minutes} = incrementTime(hours, minutes, factor))
    const finalDate = cloneDate(date, hours, minutes);

    calendarCells.push(new CalendarCell(initialDate, finalDate, i, 0, isEventInCell(events, initialDate, finalDate)));
  }

  return calendarCells;
}

const cloneDate = (date: Date, hours: number = 0, minutes: number = 0, seconds: number = 0) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, seconds);
}

const incrementTime = (hours: number, minutes: number, factor: number): {hours: number, minutes: number} => {
  minutes += 60 / factor;
  return {
    hours: minutes === 60 ? hours + 1 : hours,
    minutes: minutes === 60 ? 0 : minutes,  
  }
}

const isEventInCell = (events: Array<CalendarEvent>, initialDate: Date, finalDate: Date): Array<CalendarEvent> => {
  const isOverlapped = (event: CalendarEvent, initialDate: Date, finalDate: Date) => {
    const as = initialDate;
    const ae = finalDate;
    const rs = event.startDate;
    
    return (rs >= as && rs < ae); 
  }

  return events.filter(event => isOverlapped(event, initialDate, finalDate));
}