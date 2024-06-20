import { useState } from "react";
import styles from "./calendar.picker.module.sass";
import CalendarDayView from "./views/calendar.picker.view.day";
import CalendarYearView from "./views/calendar.picker.view.year";
import CalendarMonthView from "./views/calendar.picker.view.month";

type CalendarProps = {
  allowMultipleSelect?: boolean;
  allowPastSelect?: boolean;
  firstDate: Date;
  setFirstDate: (date: Date) => void;
  secondDate?: Date;
  setSecondDate?: (date: Date) => void;
};

export type CalendarTab = {
  month: number,
  year: number,
} 

export enum CalendarView {
  Day,
  Month,
  Year
}

export default function CalendarPicker({
  allowMultipleSelect = false,
  allowPastSelect = true,
  firstDate,
  setFirstDate,
  secondDate,
  setSecondDate,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if(!setSecondDate && allowMultipleSelect){
    throw new Error('Set final date logic is required when multiple select is allowed');
  }

  const [currentDate, setCurrentDate] = useState<{
    month: number;
    year: number;
  }>({ month: today.getMonth(), year: today.getFullYear() });

  const [view, setView] = useState<CalendarView>(CalendarView.Day);

  return (
    <div className={styles["calendar-container"]}>
      {view === CalendarView.Day && 
        <CalendarDayView 
          allowMultipleSelect={allowMultipleSelect}
          allowPastSelect={allowPastSelect}
          currentTab={currentDate}
          firstDate={firstDate}
          setFirstDate={setFirstDate}
          secondDate={secondDate}
          setSecondDate={setSecondDate}
          updateCurrentTab={setCurrentDate}
          setView={setView}
        />
      }
      {view === CalendarView.Month && 
        <CalendarMonthView 
          currentTab={currentDate}
          updateCurrentTab={setCurrentDate}
          setView={setView}
        />
      }
      {view === CalendarView.Year && 
        <CalendarYearView
          currentTab={currentDate}
          updateCurrentTab={setCurrentDate}
          setView={setView}
        />
      }
    </div>
  );
}
