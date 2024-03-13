import { useAppSelector } from "../../states/hooks";
import { CalendarEvent, CalendarView } from "../../types/calendar.types";
import Dropdown from "../buttons/dropdown/common/dropdown.common";
import styles from "./calendar.module.sass";
import CalendarDayView from "./views/calendar.day.view";

type CalendarProps = {};

export default function Calendar({}: CalendarProps) {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const view = useAppSelector((state) => state.calendar.view);

  return (
    <div className={styles["calendar-container"]}>
      <div>
        <Dropdown
          items={[
            { title: "Link 1" },
            { title: "Link 2", onClick: () => window.alert("link 2") },
            { title: "Link 3", items: [{title: "link 3 sub link 1", onClick: () => window.alert("link 3 sub link 1")}] },
          ]}
        >
          Menu
        </Dropdown>
      </div>
      {CalendarView.Day === view && (
        <CalendarDayView
          currentDay={selectedDate}
          events={[
            new CalendarEvent(
              new Date(2024, 2, 12, 3, 30, 0),
              "Buy Ace's products",
              "default",
              new Date(2024, 2, 12, 4, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 12, 3, 30, 0),
              "Go to the dentist",
              "low",
              new Date(2024, 2, 12, 8, 30, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 12, 2, 30, 0),
              "Send documents to boss",
              "important",
              new Date(2024, 2, 12, 3, 15, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 12, 3, 0, 0),
              "Take kid to school",
              "medium",
              new Date(2024, 2, 12, 4, 45, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 12, 0, 0, 0),
              "Plan trip",
              "medium",
              new Date(2024, 2, 12, 1, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 12, 0, 0, 0),
              "Do groceries",
              "low",
              new Date(2024, 2, 12, 2, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 12, 1, 0, 0),
              "Visit grandma",
              "important",
              new Date(2024, 2, 12, 2, 0, 0)
            ),
          ]}
        />
      )}
    </div>
  );
}
