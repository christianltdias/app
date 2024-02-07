import { ReactNode, useState } from 'react';
import CalendarDayView from './views/calendar.day.view';
import styles from './calendar.module.sass'

export enum CalendarView {
  Day,
  Month, 
  Year
}

type CalendarProps = {
  view?: CalendarView,
}

export type CurrentTab = {
  day: number;
  month: number;
  year: number;
}

const createTab = (date: Date): CurrentTab => {
  return { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
}

export default function Calendar({view = CalendarView.Day}: CalendarProps) {
  const today = new Date();
  
  const [currentTab, setCurrentTab] = useState<CurrentTab>(createTab(today));

  return (
    <div className={styles['calendar-container']}>
      <CalendarDayView currentDay={currentTab} />
    </div>
  );
}