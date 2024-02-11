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
          title: "Buy Ace's products",
          type: "default",
        },
        {
          startDate: new Date(2024, 1, 7, 3, 30 ,0),
          endDate: new Date(2024, 1, 7, 8, 30 ,0),
          title: "Go to the dentist",
          type: "low",
        },
        {
          startDate: new Date(2024, 1, 7, 2, 30 ,0),
          endDate: new Date(2024, 1, 7, 3, 15,0),
          title: "Send documents to boss",
          type: "important",
        },
        {
          startDate: new Date(2024, 1, 7, 3, 0 ,0),
          endDate: new Date(2024, 1, 7, 4, 45 ,0),
          title: "Take kid to school",
          type: "medium",
        },
        {
          startDate: new Date(2024, 1, 7, 0, 0 ,0),
          endDate: new Date(2024, 1, 7, 1, 0 ,0),
          title: "Plan trip",
          type: "medium",
        },
        {
          startDate: new Date(2024, 1, 7, 0, 0 ,0),
          endDate: new Date(2024, 1, 7, 2, 0 ,0),
          title: "Do groceries",
          type: "low",
        },
        {
          startDate: new Date(2024, 1, 7, 1, 0 ,0),
          endDate: new Date(2024, 1, 7, 2, 0 ,0),
          title: "Visit grandma",
          type: "important",
        },
      ]}/>
    </div>
  );
}