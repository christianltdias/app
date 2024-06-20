import { CalendarTab, CalendarView } from "../calendar.picker";
import Image from "next/image";
import styles from "./calendar.picker.view.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";

type CalendaMonthProps = {
  currentTab: CalendarTab;
  updateCurrentTab: (tab: CalendarTab) => void;
  setView: (view: CalendarView) => void;
};

export default function CalendarMonthView({
  currentTab,
  updateCurrentTab,
  setView,
}: CalendaMonthProps) {
  const arrayTest = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
  ];

  const updateYear = (increment: 1 | -1) => {
    updateCurrentTab({
      month: currentTab.month,
      year: currentTab.year + increment,
    });
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
            onClick={() => updateYear(-1)}
          />
        </div>
        <span onClick={() => setView(CalendarView.Year)}>
          {currentTab.year}
        </span>
        <div className={styles["button-wrapper"]}>
          <Image
            src="/arrow-right.svg"
            alt="Previous month"
            width={16}
            height={16}
            onClick={() => updateYear(1)}
          />
        </div>
      </div>
      <div className={styles["month-wrapper"]}>
        {arrayTest.map((month, index) => (
          <div
            className={concatStyles(
              styles["month-cell"],
              index > 11 ? styles["month-preview"] : ""
            )}
            onClick={() => {
              const year = index > 11 ? currentTab.year + 1 : currentTab.year
              const monthNumber = index > 11 ?  index - 12 : index
              updateCurrentTab({month: monthNumber, year: year});
              setView(CalendarView.Day);
            }}
          >
            {month}
          </div>
        ))}
      </div>
    </>
  );
}
