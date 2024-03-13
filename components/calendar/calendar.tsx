import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { setFactor, setView } from "../../states/slices/components/calendar/calendar.slice";
import { CalendarEvent, CalendarView } from "../../types/calendar.types";
import { getEnumByIndex } from "../../utils/enum.utils";
import Dropdown from "../buttons/dropdown/common/dropdown.common";
import styles from "./calendar.module.sass";
import CalendarDayView from "./views/calendar.day.view";

type CalendarProps = {};

export default function Calendar({}: CalendarProps) {
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const view = useAppSelector((state) => state.calendar.view);
  const factor = useAppSelector((state) => state.calendar.factor);

  return (
    <div className={styles["calendar-container"]}>
      <div className={styles["calendar-controls"]}>
        <Dropdown
          color="white"
          items={[
            {
              title: "1",
              onClick: () => dispatch(setFactor({ factor: 1 })),
            },
            {
              title: "2",
              onClick: () => dispatch(setFactor({ factor: 2 })),
            },
          ]}
        >
          Factor: {factor}
        </Dropdown>
        <Dropdown
          isSelection
          color="white"
          items={[
            {
              title: "Daily",
              onClick: () => dispatch(setView({ view: CalendarView.Day })),
            },
            {
              title: "Month",
              onClick: () => dispatch(setView({ view: CalendarView.Month })),
            },
            {
              title: "Year",
              onClick: () => dispatch(setView({ view: CalendarView.Year })),
            },
          ]}
        >
          {CalendarView[getEnumByIndex<string>(CalendarView, view)]}
        </Dropdown>
      </div>
      {CalendarView.Day === view && (
        <CalendarDayView
          currentDay={selectedDate}
          events={[
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 30, 0),
              "Buy Ace's products",
              "default",
              new Date(2024, 2, 13, 4, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 30, 0),
              "Go to the dentist",
              "low",
              new Date(2024, 2, 13, 8, 30, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 2, 30, 0),
              "Send documents to boss",
              "important",
              new Date(2024, 2, 13, 3, 15, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 0, 0),
              "Take kid to school",
              "medium",
              new Date(2024, 2, 13, 4, 45, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 0, 0, 0),
              "Plan trip",
              "medium",
              new Date(2024, 2, 13, 1, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 0, 0, 0),
              "Do groceries",
              "low",
              new Date(2024, 2, 13, 2, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 1, 0, 0),
              "Visit grandma",
              "important",
              new Date(2024, 2, 13, 2, 0, 0)
            ),
          ]}
        />
      )}

      {CalendarView.Month === view && (
        <CalendarDayView
          currentDay={selectedDate}
          events={[
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 30, 0),
              "Buy Ace's products",
              "default",
              new Date(2024, 2, 13, 4, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 30, 0),
              "Go to the dentist",
              "low",
              new Date(2024, 2, 13, 8, 30, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 2, 30, 0),
              "Send documents to boss",
              "important",
              new Date(2024, 2, 13, 3, 15, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 0, 0),
              "Take kid to school",
              "medium",
              new Date(2024, 2, 13, 4, 45, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 0, 0, 0),
              "Plan trip",
              "medium",
              new Date(2024, 2, 13, 1, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 0, 0, 0),
              "Do groceries",
              "low",
              new Date(2024, 2, 13, 2, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 1, 0, 0),
              "Visit grandma",
              "important",
              new Date(2024, 2, 13, 2, 0, 0)
            ),
          ]}
        />
      )}

      {CalendarView.Year === view && (
        <CalendarDayView
          currentDay={selectedDate}
          events={[
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 30, 0),
              "Buy Ace's products",
              "default",
              new Date(2024, 2, 13, 4, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 30, 0),
              "Go to the dentist",
              "low",
              new Date(2024, 2, 13, 8, 30, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 2, 30, 0),
              "Send documents to boss",
              "important",
              new Date(2024, 2, 13, 3, 15, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 3, 0, 0),
              "Take kid to school",
              "medium",
              new Date(2024, 2, 13, 4, 45, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 0, 0, 0),
              "Plan trip",
              "medium",
              new Date(2024, 2, 13, 1, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 0, 0, 0),
              "Do groceries",
              "low",
              new Date(2024, 2, 13, 2, 0, 0)
            ),
            new CalendarEvent(
              new Date(2024, 2, 13, 1, 0, 0),
              "Visit grandma",
              "important",
              new Date(2024, 2, 13, 2, 0, 0)
            ),
          ]}
        />
      )}
    </div>
  );
}
