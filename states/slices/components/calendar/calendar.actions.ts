
import { CalendarCell, CalendarEvent, CalendarView } from "../../../../types/calendar.types";
import { CalendarFactorType } from "./calendar.slice";

export interface SetCalendarSelectedDate {
  isNext: boolean;
}

export interface SetCalendarFactor {
  factor: CalendarFactorType;
}

export interface SetCalendarView {
  view: CalendarView;
}

export interface MapCalendarEvents {
  events: Array<CalendarEvent>;
  cells: Array<CalendarCell>;
}