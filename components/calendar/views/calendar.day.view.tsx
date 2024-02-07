import { createMonthArray } from "../../../utils/date.utils";
import { concatStyles } from "../../../utils/styles.utils";
import { CurrentTab } from "../calendar";
import { hours, Hour } from "../constants/date.constants";
import styles from "./calendar.view.module.sass";

type CalendarDayViewProps = {
  currentDay: CurrentTab;
};

export default function CalendarDayView({ currentDay }: CalendarDayViewProps) {
  const getTimeTag = (hour: Hour): string => {
    if(hour.minutes === 30){
      return '';
    }
    return `${hour.hour} ${hour.period}`
  }

  return (
    <div className={styles["calendar-day-wrapper"]}>
      <div className={styles["calendar-day-column"]}>
        <div className={styles["calendar-day-title"]}>
          {currentDay.day} - {currentDay.month} - {currentDay.year}
        </div>
        {hours.map((hour) => (
          <div className={styles["calendar-day-row"]}>
            <div className={styles["calendar-day-tag"]}>
              {getTimeTag(hour)}
            </div>
            <div
              className={concatStyles(
                styles["calendar-hour"],
                hour.minutes === 0
                  ? styles["calendar-hour-even"]
                  : styles["calendar-hour-odd"]
              )}
            >
              Test
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
