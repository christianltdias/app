import { CalendarTab, CalendarView } from "../calendar";
import styles from "./calendar.view.module.sass";

type CalendaMonthProps = {
  currentTab: CalendarTab;
  updateCurrentTab: (tab: CalendarTab) => void;
  setView: (view: CalendarView) => void;
};

export default function CalendarMonthView({currentTab, updateCurrentTab, setView}: CalendaMonthProps) {
  const arrayTest= [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
  ];
  return (
    <>
      <div className={styles["controller"]}>
        <span onClick={() => setView(CalendarView.Year)}>{currentTab.year}</span>
      </div>
      <div className={styles['month-wrapper']}>
        {arrayTest.map(month => <div className={styles['month-cell']}>{month}</div>)}
      </div>
    </>
  )
}