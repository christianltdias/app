import { CalendarView } from "../../../../components/pickers/calendar/calendar.picker";
import { CalendarCell, CalendarEvent } from "../../../../types/calendar.types";

export interface SetCalendarSelectedDate {
  date: Date;
}

export interface SetCalendarFactor {
  factor: 1 | 2;
}

export interface SetCalendarView {
  view: CalendarView;
}

export interface MapCalendarEvents {
  events: Array<CalendarEvent>;
  cells: Array<CalendarCell>;
}