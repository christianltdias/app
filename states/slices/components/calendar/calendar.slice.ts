import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CalendarCell, CalendarView } from "../../../../types/calendar.types";
import { SetCalendarFactor, SetCalendarSelectedDate, SetCalendarView } from "./calendar.actions";
import { createCalendarDayCells} from "../../../../utils/calendar.utils";

export interface ICalendarState {
  view: CalendarView,
  cells: Array<CalendarCell>,
  factor: 1 | 2,
  selectedDate: Date,
}

const initialFactor: 1 | 2 = 1;

const initialState: ICalendarState = {
  view: CalendarView.Day,
  factor: initialFactor,
  cells: createCalendarDayCells(new Date(), initialFactor),
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
      state.cells = createCalendarDayCells(new Date(), action.payload.factor);
    },
    setView: (state, action: PayloadAction<SetCalendarView>) => {
      state.view = action.payload.view;
    }
  },
});

export const { setSelectedDate, setFactor, setView } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;