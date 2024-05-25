import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CalendarCell, CalendarView } from "../../../../types/calendar.types";
import { SetCalendarFactor, SetCalendarSelectedDate, SetCalendarView } from "./calendar.actions";
import { createCalendarDayCellsMatrix} from "../../../../utils/calendar.utils";
import { createDate, createDayOfWeekFromDate, createMonthMatrix, createWeekArray } from "../../../../utils/date.utils";

export type CalendarFactorType = 1 | 2;

export interface ICalendarState {
  view: CalendarView,
  cells: Array<Array<CalendarCell>>,
  factor: CalendarFactorType
  selectedDate: Date,
}

const initialFactor: CalendarFactorType = 1;
const today: Date = new Date();
const selectedDate: Date = createDate(today.getDate(), today.getMonth(), today.getFullYear())

const initialState: ICalendarState = {
  view: CalendarView.Day,
  factor: initialFactor,
  cells: createCalendarDayCellsMatrix([createDayOfWeekFromDate(selectedDate)], initialFactor),
  selectedDate: selectedDate,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<SetCalendarSelectedDate>) => {
      let newDate: Date = state.selectedDate;
      const increment: number = action.payload.isNext ? 1 : -1
      switch(state.view){
        case CalendarView.Day:
          newDate.setDate(newDate.getDate() + 1 * increment);
          break;
        case CalendarView.Week:
          newDate.setDate(newDate.getDate() + 7 * increment);
          break;
        case CalendarView.Month:
          newDate.setDate(newDate.getDate() + 31 * increment);
          break;
      }
      state.selectedDate = createDate(newDate.getDate(), newDate.getMonth(), newDate.getFullYear());
      state.cells = createCellMatrix(state.view, state.selectedDate, state.factor);
    },
    setFactor: (state, action: PayloadAction<SetCalendarFactor>) => {
      state.factor = action.payload.factor;
      state.cells = createCellMatrix(state.view, state.selectedDate, action.payload.factor);
    },
    setView: (state, action: PayloadAction<SetCalendarView>) => {
      state.view = action.payload.view;
      state.cells = createCellMatrix(action.payload.view, state.selectedDate, state.factor);
    }
  },
});

export const { setSelectedDate, setFactor, setView } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;



const createCellMatrix = (view: CalendarView, selectedDate: Date, factor: CalendarFactorType): Array<Array<CalendarCell>> => {
  let newCells: Array<Array<CalendarCell>> = []

  switch (view) {
    case CalendarView.Day:
      newCells = createCalendarDayCellsMatrix([createDayOfWeekFromDate(selectedDate)], factor);
      break;
    case CalendarView.Week:
      const days = createWeekArray(selectedDate)
      newCells = createCalendarDayCellsMatrix(days, factor);
      break;
    case CalendarView.Month:
      const monthMatrix = createMonthMatrix(selectedDate.getMonth(), selectedDate.getFullYear())
      const innerCells = []
      monthMatrix.map(col => {
        const rowCells = 
        col.map((x, index) => new CalendarCell(index, new Date(x.year, x.month, x.day, 0, 0, 0), new Date(x.year, x.month, x.day, 23, 59, 59), index, 0));
        innerCells.push(rowCells)
      })
      newCells = innerCells;
      break;
  }

  return newCells
}