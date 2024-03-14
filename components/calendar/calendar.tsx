import { useAppDispatch, useAppSelector } from "../../states/hooks";
import {
  setFactor,
  setView,
} from "../../states/slices/components/calendar/calendar.slice";
import { CalendarEvent, CalendarView } from "../../types/calendar.types";
import { getEnumByIndex } from "../../utils/enum.utils";
import Dropdown from "../buttons/dropdown/common/dropdown.common";
import styles from "./calendar.module.sass";
import CalendarDayView from "./views/day/calendar.day.view";
import CalendarMonthView from "./views/month/calendar.month.view";
import CalendarWeekView from "./views/week/calendar.week.view";

type CalendarProps = {};

export default function Calendar({}: CalendarProps) {
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const view = useAppSelector((state) => state.calendar.view);
  const factor = useAppSelector((state) => state.calendar.factor);

  const events = [
    new CalendarEvent(
      new Date(2024, 2, 14, 3, 30, 0),
      "Buy Ace's products",
      "default",
      new Date(2024, 2, 14, 4, 0, 0)
    ),
    new CalendarEvent(
      new Date(2024, 2, 14, 3, 30, 0),
      "Go to the dentist",
      "low",
      new Date(2024, 2, 14, 8, 30, 0)
    ),
    new CalendarEvent(
      new Date(2024, 2, 14, 2, 30, 0),
      "Send documents to boss",
      "important",
      new Date(2024, 2, 14, 3, 15, 0)
    ),
    new CalendarEvent(
      new Date(2024, 2, 14, 3, 0, 0),
      "Take kid to school",
      "medium",
      new Date(2024, 2, 14, 4, 45, 0)
    ),
    new CalendarEvent(
      new Date(2024, 2, 14, 0, 0, 0),
      "Plan trip",
      "medium",
      new Date(2024, 2, 14, 1, 0, 0)
    ),
    new CalendarEvent(
      new Date(2024, 2, 14, 0, 0, 0),
      "Do groceries",
      "low",
      new Date(2024, 2, 14, 2, 0, 0)
    ),
    new CalendarEvent(
      new Date(2024, 2, 14, 1, 0, 0),
      "Visit grandma",
      "important",
      new Date(2024, 2, 14, 2, 0, 0)
    ),
  ];

  return (
    <div className={styles["calendar-container"]}>
      <div className={styles["calendar-controls"]}>
        <Dropdown
          color="secondary"
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
          placeholder={`Factor: ${factor}`}
        />
        <Dropdown
          isSelection
          color="secondary"
          items={[
            {
              title:
                CalendarView[
                  getEnumByIndex<string>(CalendarView, CalendarView.Day)
                ],
              onClick: () => dispatch(setView({ view: CalendarView.Day })),
            },
            {
              title:
                CalendarView[
                  getEnumByIndex<string>(CalendarView, CalendarView.Week)
                ],
              onClick: () => dispatch(setView({ view: CalendarView.Week })),
            },
            {
              title:
                CalendarView[
                  getEnumByIndex<string>(CalendarView, CalendarView.Month)
                ],
              onClick: () => dispatch(setView({ view: CalendarView.Month })),
            },
          ]}
          placeholder={CalendarView[getEnumByIndex<string>(CalendarView, view)]}
        />
      </div>
      {CalendarView.Day === view && (
        <CalendarDayView currentDay={selectedDate} events={events} />
      )}

      {CalendarView.Week === view && (
        <CalendarWeekView currentDay={selectedDate} events={[]} />
      )}

      {CalendarView.Month === view && (
        <CalendarMonthView currentDay={selectedDate} events={[]} />
      )}
    </div>
  );
}
