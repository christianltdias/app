import styles from "./calendar.view.module.sass";
import { getEnumByIndex } from "../../../../utils/enum.utils";
import { concatStyles } from "../../../../utils/styles.utils";
import Image from "next/image";
import { DayOfMonth, DayOfWeek, Month } from "../../../../types/dates";
import { CalendarTab, CalendarView } from "../calendar";
import { createDate, createMonthArray } from "../../../../utils/date.utils";

type CalendaDayProps = {
  currentTab: CalendarTab;
  updateCurrentTab: (tab: CalendarTab) => void;
  firstDate: Date;
  setFirstDate: (date: Date) => void;
  secondDate?: Date;
  setSecondDate?: (date: Date) => void;
  allowMultipleSelect: boolean;
  allowPastSelect: boolean;
  setView: (view: CalendarView) => void;
};

export default function CalendarDayView({
  currentTab,
  updateCurrentTab,
  firstDate,
  setFirstDate,
  secondDate,
  setSecondDate,
  allowMultipleSelect,
  allowPastSelect,
  setView,
}: CalendaDayProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  var monthMatrix = createMonthArray(currentTab.month, currentTab.year);
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
    const date = createDate(dayOfMonth.day, dayOfMonth.month, dayOfMonth.year);
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
    var month = currentTab.month + increment;
    var year = currentTab.year;

    if (month > 11) {
      month = 0;
      year++;
    } else if (month < 0) {
      month = 11;
      year--;
    }

    updateCurrentTab({ month, year });
  };

  return (
    <>
      <div className={styles["controller"]}>
        <div className={styles["button-wrapper"]}>
          <Image
            src="/arrow-left.svg"
            alt="Previous month"
            width={16}
            height={16}
            onClick={() => updateMonth(-1)}
          />
        </div>
        <span onClick={() => setView(CalendarView.Month)}>{Month[getEnumByIndex<string>(Month, currentTab.month)]}</span>
        <span onClick={() => setView(CalendarView.Year)}>{currentTab.year}</span>
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
              dayOfMonth.month !== currentTab.month
                ? styles["day-cell-preview"]
                : styles["day-cell"],
                currentTab.month === dayOfMonth.month &&
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
                today.getMonth() === currentTab.month &&
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
    </>
  );
}
