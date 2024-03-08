import { useAppSelector } from '../../states/hooks';
import { CalendarEvent } from '../../types/calendar.types';
import styles from './calendar.module.sass';
import CalendarDayView from './views/calendar.day.view';

type CalendarProps = {
}

export default function Calendar({}: CalendarProps) {
  const selectedDate = useAppSelector(state => state.calendar.selectedDate)
  const view = useAppSelector(state => state.calendar.view)

  return (
    <div className={styles['calendar-container']}>
      <CalendarDayView currentDay={selectedDate} events={[
        new CalendarEvent(new Date(2024, 2, 8, 3, 30 ,0), "Buy Ace's products", "default", new Date(2024, 2, 8, 4, 0 ,0)),
        new CalendarEvent(new Date(2024, 2, 8, 3, 30 ,0), "Go to the dentist", "low", new Date(2024, 2, 8, 8, 30 ,0)),
        new CalendarEvent(new Date(2024, 2, 8, 2, 30 ,0), "Send documents to boss", "important", new Date(2024, 2, 8, 3, 15,0)),
        new CalendarEvent(new Date(2024, 2, 8, 3, 0 ,0), "Take kid to school", "medium", new Date(2024, 2, 8, 4, 45 ,0)),
        new CalendarEvent(new Date(2024, 2, 8, 0, 0 ,0), "Plan trip", "medium", new Date(2024, 2, 8, 1, 0 ,0)),
        new CalendarEvent(new Date(2024, 2, 8, 0, 0 ,0), "Do groceries", "low", new Date(2024, 2, 8, 2, 0 ,0)),
        new CalendarEvent(new Date(2024, 2, 8, 1, 0 ,0), "Visit grandma", "important", new Date(2024, 2, 8, 2, 0 ,0)),
      ]}/>
    </div>
  );
}