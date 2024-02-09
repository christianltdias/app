import { useState } from 'react';
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
      <CalendarDayView currentDay={currentTab} events={[
        {
          startDate: new Date(2024, 1, 7, 3, 30 ,0),
          endDate: new Date(2024, 1, 7, 4, 0 ,0),
          title: "30 min"
        },
        {
          startDate: new Date(2024, 1, 7, 3, 30 ,0),
          endDate: new Date(2024, 1, 7, 5, 30 ,0),
          title: "2 h"
        },
        {
          startDate: new Date(2024, 1, 7, 2, 30 ,0),
          endDate: new Date(2024, 1, 7, 3, 45 ,0),
          title: "1h 45 min"
        },
        {
          startDate: new Date(2024, 1, 7, 3, 0 ,0),
          endDate: new Date(2024, 1, 7, 4, 45 ,0),
          title: "1 h 45 min"
        },
        {
          startDate: new Date(2024, 1, 7, 3, 30 ,0),
          endDate: new Date(2024, 1, 7, 4, 30 ,0),
          title: "1 h"
        },
        {
          startDate: new Date(2024, 1, 7, 3, 0 ,0),
          endDate: new Date(2024, 1, 7, 5, 0 ,0),
          title: "2 h"
        },
      ]}/>
    </div>
  );
}