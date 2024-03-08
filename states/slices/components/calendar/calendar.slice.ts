import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CalendarCell, CalendarView } from "../../../../types/calendar.types";
import { MapCalendarEvents, SetCalendarFactor, SetCalendarSelectedDate, SetCalendarView } from "./calendar.actions";
import { createCalendarDayCells, mapEvents } from "../../../../utils/calendar.utils";

export interface ICalendarState {
  view: CalendarView,
  cells: Array<CalendarCell>,
  factor: 1 | 2 | 4,
  selectedDate: Date,
}

const initialState: ICalendarState = {
  view: CalendarView.Day,
  factor: 1,
  cells: createCalendarDayCells(new Date(), 1),
  selectedDate: new Date(),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<SetCalendarSelectedDate>) => {
      state.selectedDate = action.payload.date;
    },
    setFactor: (state, action: PayloadAction<SetCalendarFactor>) => {
      state.factor = action.payload.factor;
    },
    setView: (state, action: PayloadAction<SetCalendarView>) => {
      state.view = action.payload.view;
    },
    setCells: (state, action: PayloadAction<MapCalendarEvents>) => {
      state.cells = mapEvents(action.payload.events, action.payload.cells);
    },
  },
});

export const { setSelectedDate, setFactor, setView, setCells } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;