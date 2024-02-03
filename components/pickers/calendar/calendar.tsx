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
};

export default function Calendar({
  allowMultipleSelect = false,
  allowPastSelect = true,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState<{
    month: number;
    year: number;
  }>({ month: today.getMonth(), year: today.getFullYear() });
  const [firstDate, setFirstDate] = useState<DayOfMonth>(null);
  const [secondDate, setSecondDate] = useState<DayOfMonth>(null);

  var monthMatrix = createMonthArray(currentDate.month, currentDate.year);
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
    ).getTime();

    if (!allowPastSelect && date < today.getTime()) {
      return;
    }

    if (!firstDate || !allowMultipleSelect) {
      if (
        !firstDate ||
        createDate(firstDate.day, firstDate.month, firstDate.year).getTime() !==
          date
      ) {
        setFirstDate(dayOfMonth);
      }
      return;
    }

    const initialDate = createDate(
      firstDate.day,
      firstDate.month,
      firstDate.year
    ).getTime();

    if (!secondDate) {
      if (date < initialDate) {
        setFirstDate(dayOfMonth);
        setSecondDate(firstDate);
      } else {
        setSecondDate;
        setSecondDate(dayOfMonth);
      }
      return;
    }

    const finalDate = createDate(
      secondDate.day,
      secondDate.month,
      secondDate.year
    ).getTime();

    if (date === initialDate && date === finalDate) {
      return;
    } else if (date < initialDate || date === finalDate) {
      setFirstDate(dayOfMonth);
    } else if (date > finalDate || date === initialDate) {
      setSecondDate(dayOfMonth);
    } else {
      var initialOffset = (date - initialDate) / (1000 * 3600 * 24) + 1;
      var finalOffset = (finalDate - date) / (1000 * 3600 * 24) + 1;
      if (initialOffset <= finalOffset) {
        setFirstDate(dayOfMonth);
      } else {
        setSecondDate(dayOfMonth);
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
