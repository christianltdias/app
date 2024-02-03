import styles from "./calendar.view.module.sass"; 
import { CalendarTab, CalendarView } from "../calendar";

type CalendaYearProps = {
  currentTab: CalendarTab;
  updateCurrentTab: (tab: CalendarTab) => void;
  setView: (view: CalendarView) => void;
};


export default function CalendarYearView({currentTab, updateCurrentTab, setView}: CalendaYearProps) {
  const arrayTest= [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
  return (
    <>
      <div className={styles["controller"]}>
        <span onClick={() => setView(CalendarView.Day)}>2020 - 2029 </span>
      </div>
      <div className={styles['year-wrapper']}>
        {arrayTest.map(month => <div className={styles['year-cell']}>{month}</div>)}
      </div>
    </>
  )
}