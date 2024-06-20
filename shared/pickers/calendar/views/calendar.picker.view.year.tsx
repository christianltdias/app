import Image from "next/image";
import { CalendarTab, CalendarView } from "../calendar.picker";
import styles from "./calendar.picker.view.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";
import { useState } from "react";

type CalendaYearProps = {
  currentTab: CalendarTab;
  updateCurrentTab: (tab: CalendarTab) => void;
  setView: (view: CalendarView) => void;
};

export default function CalendarYearView({
  currentTab,
  updateCurrentTab,
  setView,
}: CalendaYearProps) {

  const [currentYear, setCurrentYear] = useState<number>(currentTab.year);

  const getFirstYearOfDecade = (year: number): number => {
    const getLastDigit = (value: number) => value % 10;
    var lastDigit = getLastDigit(year);
    while (lastDigit !== 0) {
      year--;
      lastDigit = getLastDigit(year);
    }
    return year;
  };

  const getYearsRange = (year: number): Array<number> => {
    const years = [];

    for(let i = 0;  i < 16; i++){
      years.push(year + i)
    }

    return years;
  }

  const firstYearOfDecate = getFirstYearOfDecade(currentYear);

  return (
    <>
      <div className={styles["controller"]}>
        <div className={styles["button-wrapper"]}>
          <Image
            src="/arrow-left.svg"
            alt="Previous month"
            width={16}
            height={16}
            onClick={() => setCurrentYear(currentYear - 10)}
          />
        </div>
        <span onClick={() => setView(CalendarView.Day)}>
          {firstYearOfDecate} - {firstYearOfDecate + 9}
        </span>
        <div className={styles["button-wrapper"]}>
          <Image
            src="/arrow-right.svg"
            alt="Previous month"
            width={16}
            height={16}
            onClick={() => setCurrentYear(currentYear + 10)}
          />
        </div>
      </div>
      <div className={styles["year-wrapper"]}>
        {getYearsRange(firstYearOfDecate).map((year, index) => (
          <div
            className={concatStyles(
              styles["year-cell"],
              index > 10 ? styles["year-preview"] : ""
            )}
            onClick={() => {
              updateCurrentTab({month: currentTab.month, year: year});
              setView(CalendarView.Month);
            }}
          >
            {year}
          </div>
        ))}
      </div>
    </>
  );
}
