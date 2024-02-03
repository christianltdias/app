import { useState } from "react";
import { DayOfMonth, DayOfWeek, Month } from "../../../types/dates";
import { createDate, createMonthArray } from "../../../utils/date.utils";
import { getEnumByIndex } from "../../../utils/enum.utils";
import { concatStyles } from "../../../utils/styles.utils";
import Image from "next/image";
import styles from "./calendar.module.sass";

type CalendarProps = {
  allowMultipleSelect?: boolean;
  allowPastSelect?: boolean;
  firstDate: Date;
  setFirstDate: (date: Date) => void;
  secondDate?: Date;
  setSecondDate?: (date: Date) => void;
};

export default function Calendar({
  allowMultipleSelect = false,
  allowPastSelect = true,
  firstDate,
  setFirstDate,
  secondDate,
  setSecondDate,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if(!setSecondDate && allowMultipleSelect){
    throw new Error('Set final date logic is required when multiple select is allowed');
  }

  const [currentDate, setCurrentDate] = useState<{
    month: number;
    year: number;
  }>({ month: today.getMonth(), year: today.getFullYear() });

  var monthMatrix = createMonthArray(currentDate.month, currentDate.year);
  var daysOfWeekSequence = Object.values(DayOfWeek);

  const checkIfInRange = (
    dayOfMonth: DayOfMonth
  ): "edge-left" | "edge-right" | "edge-both" | "range" | "none" => {
    const initialDate = firstDate ? firstDate.getTime() : null;
    const finalDate = secondDate ? secondDate.getTime() : null;

    const date = createDate(
      dayOfMonth.day,
      dayOfMonth.month,
      dayOfMonth.year
    ).getTime();

    if (
      (initialDate === date && (finalDate === date || !finalDate)) ||
      (initialDate === date &&
        DayOfWeek.Saturday === DayOfWeek[dayOfMonth.dayOfWeek]) ||
      (finalDate === date &&
        DayOfWeek.Sunday === DayOfWeek[dayOfMonth.dayOfWeek])
    ) {
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
    
    const date = createDate(
      dayOfMonth.day,
      dayOfMonth.month,
      dayOfMonth.year
    );
    const dateTime = date.getTime();

    if (!allowPastSelect && dateTime < today.getTime()) {
      return;
    }

    if (!firstDate || !allowMultipleSelect) {
      if (!firstDate || firstDate.getTime() !== dateTime) {
        setFirstDate(date);
      }
      return;
    }

    const initialDate = firstDate.getTime();

    if (!secondDate) {
      if (dateTime < initialDate) {
        setFirstDate(date);
        setSecondDate(firstDate);
      } else {
        setSecondDate;
        setSecondDate(date);
      }
      return;
    }

    const finalDate = secondDate.getTime();

    if (dateTime === initialDate && dateTime === finalDate) {
      return;
    } else if (dateTime < initialDate || dateTime === finalDate) {
      setFirstDate(date);
    } else if (dateTime > finalDate || dateTime === initialDate) {
      setSecondDate(date);
    } else {
      var initialOffset = (dateTime - initialDate) / (1000 * 3600 * 24) + 1;
      var finalOffset = (finalDate - dateTime) / (1000 * 3600 * 24) + 1;
      if (initialOffset <= finalOffset) {
        setFirstDate(date);
      } else {
        setSecondDate(date);
      }
    }
  };

  const updateMonth = (increment: 1 | -1) => {
    var month = currentDate.month + increment;
    var year = currentDate.year;

    if (month > 11) {
      month = 0;
      year++;
    } else if (month < 0) {
      month = 11;
      year--;
    }

    setCurrentDate({ month, year });
  };

  return (
    <div className={styles["calendar-container"]}>
      <div className={styles["month-controller"]}>
        <div className={styles["button-wrapper"]}>
          <Image
            src="/arrow-left.svg"
            alt="Previous month"
            width={16}
            height={16}
            onClick={() => updateMonth(-1)}
          />
        </div>
        <span>{Month[getEnumByIndex<string>(Month, currentDate.month)]}</span>
        <span>{currentDate.year}</span>
        <div className={styles["button-wrapper"]}>
          <Image
            src="/arrow-right.svg"
            alt="Previous month"
            width={16}
            height={16}
            onClick={() => updateMonth(1)}
          />
        </div>
      </div>
      <div className={styles["days-wrapper"]}>
        {daysOfWeekSequence.map((dayOfWeek) => (
          <div
            key={`day-week-${dayOfWeek}`}
            className={styles["day-cell-week"]}
          >
            {dayOfWeek}
          </div>
        ))}
        {monthMatrix.map((dayOfMonth) => (
          <div
            key={`day-month-${dayOfMonth.month}-${dayOfMonth.day}`}
            className={concatStyles(
              dayOfMonth.month !== currentDate.month
                ? styles["day-cell-preview"]
                : styles["day-cell"],
              currentDate.month === dayOfMonth.month &&
                (DayOfWeek[dayOfMonth.dayOfWeek] === DayOfWeek.Sunday ||
                  DayOfWeek[dayOfMonth.dayOfWeek] === DayOfWeek.Saturday)
                ? styles["weekend"]
                : ""
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
            <div
              className={concatStyles(
                styles[`day-cell-selected-${checkIfInRange(dayOfMonth)}`],
                today.getMonth() === currentDate.month &&
                  today.getDate() === dayOfMonth.day &&
                  today.getMonth() === dayOfMonth.month &&
                  today.getFullYear() === dayOfMonth.year
                  ? styles["today"]
                  : ""
              )}
            >
              {dayOfMonth.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
