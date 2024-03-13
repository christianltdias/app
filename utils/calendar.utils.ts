import { Month } from "../types/dates";
import { getEnumByIndex } from "./enum.utils";
import { CalendarCell, CalendarEvent } from "../types/calendar.types";
import { BoundaryReference } from "../types/references";

export const getTop = (boundary: BoundaryReference<any>, margin: number): number => {
  const now = new Date();
  const initialDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const finalDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  
  const totalminutes = CalendarEvent.getDuration(initialDate, finalDate);
  const currentminutes = CalendarEvent.getDuration(initialDate, now);
  const top = currentminutes === 0 ? 0 : boundary.height * currentminutes / totalminutes + margin;

  return top;
};

export const getDayName = (currentDay: Date) => {
  return `${currentDay.getDate()} ${Month[getEnumByIndex<string>(Month, currentDay.getMonth())]} ${currentDay.getFullYear()}`
}

export const createCalendarDayCells = (date: Date, factor: number): Array<CalendarCell> => {
  var calendarCells: Array<CalendarCell> = [];
  const hoursArray = Array.from(Array(24 * factor).keys())
  var hours = 0
  var minutes = 0

  for(let i = 0; i < hoursArray.length; i++) {
    const initialDate = cloneDate(date, hours, minutes);
    ({hours, minutes} = incrementTime(hours, minutes, factor))
    const finalDate = cloneDate(date, hours, minutes);
    calendarCells.push(new CalendarCell(i, initialDate, finalDate, i, 0));
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

export const mapEvents = (events: Array<CalendarEvent>, cells: Array<CalendarCell>): Array<CalendarCell> => {
   events.forEach(e => {
    cells.forEach(c => {
      if(isCellParentOfEvent(e, c)){
        e.parentCell = c
      }
    })
  })

  return cells;
}

export const isCellParentOfEvent = (event: CalendarEvent, cell: CalendarCell| CalendarEvent): boolean => {
  const cs = cell.startDate;
  const ce = cell.endDate;
  const es = event.startDate;
  
  return (es >= cs && es < ce);
}

export const isCellPartOfEvent = (event: CalendarEvent, cell: CalendarCell | CalendarEvent): boolean => {
  const cs = cell.startDate;
  const ce = cell.endDate;
  const es = event.startDate;
  const ee = event.endDate;

  return (es < ce && ee > cs);
}