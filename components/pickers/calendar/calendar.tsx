import { useState } from "react";
import { DayOfMonth, DayOfWeek } from "../../../types/dates";
import { createDate, createMonthArray } from "../../../utils/date.utils";
import styles from "./calendar.module.sass";
import { concatStyles } from "../../../utils/styles.utils";
import Tooltip from "../../tooltip/tooltip";

type CalendarProps = {
  multipleSelect?: boolean;
};

export default function Calendar({ multipleSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [firstDate, setFirstDate] = useState<DayOfMonth>(null);
  const [secondDate, setSecondDate] = useState<DayOfMonth>(null);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  var monthMatrix = createMonthArray(month, year);
  var daysOfWeekSequence = Object.values(DayOfWeek);
  // console.log(monthMatrix)
  const checkIfInRange = (
    dayOfMonth: DayOfMonth
  ): "edge-left" | "edge-right" | "range" | "none" => {

    const initialDate = firstDate
      ? createDate(firstDate.day, firstDate.month, firstDate.year).getTime()
      : null;
    const finalDate = secondDate
      ? createDate(secondDate.day, secondDate.month, secondDate.year).getTime()
      : null;
    const date = createDate(dayOfMonth.day, dayOfMonth.month, dayOfMonth.year).getTime()

    // if(dayOfMonth.day === 1 || dayOfMonth.day === 30){
    //   console.log(`---------------${dayOfMonth.day}-${dayOfMonth.month}----------------`)
    //   console.log(initialDate)
    //   console.log(finalDate)
    //   console.log(date)
    // }

    if (initialDate === date) {
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
    if (!firstDate) {
      setFirstDate(dayOfMonth);
      return;
    }
    const initialDate = createDate(firstDate.day, firstDate.month, firstDate.year).getTime();
    const date = createDate(dayOfMonth.day, dayOfMonth.month, dayOfMonth.year).getTime();

    if (!secondDate) {
      if (date < initialDate) {
        setFirstDate(dayOfMonth);
      } else {
        setSecondDate(dayOfMonth);
      }
      return;
    }

    const finalDate = createDate(secondDate.day, secondDate.month, secondDate.year).getTime();
    
    if (date <= initialDate || (date > initialDate && date < finalDate)) {
      setFirstDate(dayOfMonth);
    } else if (date === finalDate || date === initialDate) {
      setFirstDate(dayOfMonth);
      setSecondDate(dayOfMonth);
    } else {
      setSecondDate(dayOfMonth);
    }
  };

  return (
    <div className={styles["calendar-container"]}>
      <div className={styles["days-wrapper"]}>
        {daysOfWeekSequence.map((dayOfWeek) => (
          <div className={styles["day-cell-week"]}>{dayOfWeek}</div>
        ))}
        {monthMatrix.map((dayOfMonth) => (
          // <Tooltip text="Right click to remove selection">
            <div
              className={concatStyles(
                dayOfMonth.month !== month
                  ? styles["day-cell-preview"]
                  : styles["day-cell"],
                styles[`day-cell-selected-${checkIfInRange(dayOfMonth)}`]
              )}
              onClick={() => handleSelection(dayOfMonth)}
              onContextMenu={(e) => {
                e.preventDefault();
                if (firstDate || secondDate) {
                  setFirstDate(null);
                  setSecondDate(null);
                }
              }}
            >
              {dayOfMonth.day}
            </div>
          // </Tooltip>
        ))}
      </div>
    </div>
  );
}
