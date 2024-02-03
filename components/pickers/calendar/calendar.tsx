import { useState } from "react";
import { DayOfMonth, DayOfWeek } from "../../../types/dates";
import { createDate, createMonthArray } from "../../../utils/date.utils";
import { concatStyles } from "../../../utils/styles.utils";
import styles from "./calendar.module.sass";

type CalendarProps = {
  allowMultipleSelect?: boolean;
  allowPastSelect?: boolean;
};

export default function Calendar({ allowMultipleSelect = false, allowPastSelect = true}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [firstDate, setFirstDate] = useState<DayOfMonth>(null);
  const [secondDate, setSecondDate] = useState<DayOfMonth>(null);

  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  var monthMatrix = createMonthArray(month, year);
  var daysOfWeekSequence = Object.values(DayOfWeek);

  const checkIfInRange = (
    dayOfMonth: DayOfMonth
  ): "edge-left" | "edge-right" | "edge-both" | "range" | "none" => {

    const initialDate = firstDate
      ? createDate(firstDate.day, firstDate.month, firstDate.year).getTime()
      : null;
    const finalDate = secondDate
      ? createDate(secondDate.day, secondDate.month, secondDate.year).getTime()
      : null;
    const date = createDate(dayOfMonth.day, dayOfMonth.month, dayOfMonth.year).getTime()

    if(initialDate === date && (finalDate === date || !finalDate)
      || (initialDate === date && DayOfWeek.Saturday === DayOfWeek[dayOfMonth.dayOfWeek])
      || (finalDate === date && DayOfWeek.Sunday === DayOfWeek[dayOfMonth.dayOfWeek])){
      return "edge-both";
    } else if (initialDate === date) {
      return "edge-left";
    } else if (finalDate === date) {
      return "edge-right";
    } else if (date > initialDate && date < finalDate) {
      if (DayOfWeek[dayOfMonth.dayOfWeek] === DayOfWeek.Sunday) {
        return "edge-left";
      } else if (DayOfWeek[dayOfMonth.dayOfWeek] === DayOfWeek.Saturday) {
        return "edge-right";
      }
      return "range";
    }

    return "none";
  };

  const handleSelection = (dayOfMonth: DayOfMonth): void => {
    const date = createDate(dayOfMonth.day, dayOfMonth.month, dayOfMonth.year).getTime();
    const dateNow = new Date();
    dateNow.setHours(0,0,0,0);

    if(!allowPastSelect && date < dateNow.getTime()) {
      return;
    }

    if (!firstDate || !allowMultipleSelect) {
      if(!firstDate || createDate(firstDate.day, firstDate.month, firstDate.year).getTime() !== date){
        setFirstDate(dayOfMonth);
      }
      return;
    }

    const initialDate = createDate(firstDate.day, firstDate.month, firstDate.year).getTime();

    if (!secondDate) {
      if (date < initialDate) {
        setFirstDate(dayOfMonth);
        setSecondDate(firstDate);
      } else {setSecondDate
        setSecondDate(dayOfMonth);
      }
      return;
    }

    const finalDate = createDate(secondDate.day, secondDate.month, secondDate.year).getTime();
    
    if(date === initialDate && date === finalDate){
      return;
    } else if (date < initialDate || date === finalDate) {
      setFirstDate(dayOfMonth);
    } else if (date > finalDate || date === initialDate) {
      setSecondDate(dayOfMonth)
    } else {
      var initialOffset = (date - initialDate) / (1000 * 3600 * 24) + 1
      var finalOffset = (finalDate - date) / (1000 * 3600 * 24) + 1
      if(initialOffset <= finalOffset){
        setFirstDate(dayOfMonth)
      } else {
        setSecondDate(dayOfMonth)
      }
    }
  };

  return (
    <div className={styles["calendar-container"]}>
      <div className={styles["days-wrapper"]}>
        {daysOfWeekSequence.map((dayOfWeek) => (
          <div key={`day-week-${dayOfWeek}`} className={styles["day-cell-week"]}>{dayOfWeek}</div>
        ))}
        {monthMatrix.map((dayOfMonth) => (
            <div
              key={`day-month-${dayOfMonth.month}-${dayOfMonth.day}`}
              className={dayOfMonth.month !== month ? styles["day-cell-preview"] : styles["day-cell"]}
              onClick={() => handleSelection(dayOfMonth)}
              onContextMenu={(e) => {
                e.preventDefault();
                if (firstDate || secondDate) {
                  setFirstDate(null);
                  setSecondDate(null);
                }
              }}
            >
              <div className={concatStyles(
                styles[`day-cell-selected-${checkIfInRange(dayOfMonth)}`],
                day === dayOfMonth.day && month === dayOfMonth.month && year === dayOfMonth.year ? styles['today'] : '')}>
                {dayOfMonth.day}
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
