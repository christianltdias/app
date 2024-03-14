import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CalendarCell, CalendarView } from "../../../../types/calendar.types";
import { SetCalendarFactor, SetCalendarSelectedDate, SetCalendarView } from "./calendar.actions";
import { createCalendarDayCellsMatrix} from "../../../../utils/calendar.utils";
import { createDayOfWeekFromDate, createMonthMatrix, createWeekArray } from "../../../../utils/date.utils";

export interface ICalendarState {
  view: CalendarView,
  cells: Array<Array<CalendarCell>>,
  factor: 1 | 2,
  selectedDate: Date,
}

const initialFactor: 1 | 2 = 1;

const initialState: ICalendarState = {
  view: CalendarView.Day,
  factor: initialFactor,
  cells: createCalendarDayCellsMatrix([createDayOfWeekFromDate(new Date())], initialFactor),
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
      switch (state.view) {
        case CalendarView.Day:
          state.cells = createCalendarDayCellsMatrix([createDayOfWeekFromDate(state.selectedDate)], action.payload.factor);
          break;
        case CalendarView.Week:
          const days = createWeekArray(state.selectedDate)
          state.cells = createCalendarDayCellsMatrix(days, action.payload.factor);
          break;
        case CalendarView.Month:
          const monthMatrix = createMonthMatrix(state.selectedDate.getMonth(), state.selectedDate.getFullYear())
          const cells = []
          monthMatrix.map(col => {
            const rowCells = 
            col.map((x, index) => new CalendarCell(index, new Date(x.year, x.month, x.day, 0, 0, 0), new Date(x.year, x.month, x.day, 23, 59, 59), index, 0));
            cells.push(rowCells)
          })
          state.cells = cells;
          break;
      }
    },
    setView: (state, action: PayloadAction<SetCalendarView>) => {
      state.view = action.payload.view;

      switch (action.payload.view) {
        case CalendarView.Day:
          state.cells = createCalendarDayCellsMatrix([createDayOfWeekFromDate(state.selectedDate)], state.factor);
          break;
        case CalendarView.Week:
          const days = createWeekArray(state.selectedDate)
          state.cells = createCalendarDayCellsMatrix(days, state.factor);
          break;
        case CalendarView.Month:
          const monthMatrix = createMonthMatrix(state.selectedDate.getMonth(), state.selectedDate.getFullYear())
          const cells = []
          monthMatrix.map(col => {
            const rowCells = 
              col.map((x, index) => new CalendarCell(index, new Date(x.year, x.month, x.day, 0, 0, 0), new Date(x.year, x.month, x.day, 23, 59, 59), index, 0));
            cells.push(rowCells)
          })
          state.cells = cells;
          break;
      }
    }
  },
});

export const { setSelectedDate, setFactor, setView } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;