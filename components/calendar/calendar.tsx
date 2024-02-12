import { useState } from 'react';
import CalendarDayView from './views/calendar.day.view';
import styles from './calendar.module.sass'
import { CalendarEvent } from './types/calendar.types';

export enum CalendarView {
  Day,
  Month, 
  Year
}

type CalendarProps = {
  view?: CalendarView,
}

export default function Calendar({view = CalendarView.Day}: CalendarProps) { 
  const [currentTab, setCurrentTab] = useState<Date>(new Date());

  return (
    <div className={styles['calendar-container']}>
      <CalendarDayView currentDay={currentTab} events={[
        new CalendarEvent(new Date(2024, 1, 12, 3, 30 ,0), "Buy Ace's products", "default", new Date(2024, 1, 12, 4, 0 ,0)),
        new CalendarEvent(new Date(2024, 1, 12, 3, 30 ,0), "Go to the dentist", "low", new Date(2024, 1, 12, 8, 30 ,0)),
        new CalendarEvent(new Date(2024, 1, 12, 2, 30 ,0), "Send documents to boss", "important", new Date(2024, 1, 12, 3, 15,0)),
        new CalendarEvent(new Date(2024, 1, 12, 3, 0 ,0), "Take kid to school", "medium", new Date(2024, 1, 12, 4, 45 ,0)),
        new CalendarEvent(new Date(2024, 1, 12, 0, 0 ,0), "Plan trip", "medium", new Date(2024, 1, 12, 1, 0 ,0)),
        new CalendarEvent(new Date(2024, 1, 12, 0, 0 ,0), "Do groceries", "low", new Date(2024, 1, 12, 2, 0 ,0)),
        new CalendarEvent(new Date(2024, 1, 12, 1, 0 ,0), "Visit grandma", "important", new Date(2024, 1, 12, 2, 0 ,0)),
      ]}/>
    </div>
  );
}