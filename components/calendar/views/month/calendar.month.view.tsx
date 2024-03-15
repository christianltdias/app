import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../states/hooks";
import { CalendarCell, CalendarEvent } from "../../../../types/calendar.types";
import { isCellPartOfEvent } from "../../../../utils/calendar.utils";
import { createWeekArray } from "../../../../utils/date.utils";
import Spinner from "../../../spinner/spinner";
import styles from "./calendar.month.view.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";
import { getEnumIndex } from "../../../../utils/enum.utils";
import { DayOfWeek } from "../../../../types/dates";

type CalendarMonthViewProps = {
  currentDay: Date;
  events: Array<CalendarEvent>;
  cellHeight?: number;
};

export default function CalendarMonthView({
  currentDay,
  events,
  cellHeight = 160,
}: CalendarMonthViewProps) {
  const wrapperRef = useRef(null);
  const tableRef = useRef(null);

  const factor = useAppSelector((state) => state.calendar.factor);
  const cells = useAppSelector((state) => state.calendar.cells);
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const today = new Date();

  const [cellRefs, setCellRefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mappedEvents, setMappedEvents] = useState<CalendarEvent[]>([]);

  const week = createWeekArray(currentDay);

  useEffect(() => {
    // setCellRefs((elRefs) => cells.map((_, i) => elRefs[i] || createRef()));
    // setMappedEvents(getEvents(events, mapEvents(events, cells)));
    setLoading(false);
  }, []);

  useEffect(() => {}, [wrapperRef, tableRef]);

  const getEvents = (
    events: CalendarEvent[],
    cells: CalendarCell[]
  ): CalendarEvent[] => {
    cells.map((cell) => {
      var cellEvents = events.filter((event) => isCellPartOfEvent(event, cell));
      cellEvents.map((refevent) => {
        var conflictedEvents = events.filter(
          (event) =>
            refevent.id !== event.id && isCellPartOfEvent(refevent, event)
        );
        if (refevent.maxConflictedEvents.length < conflictedEvents.length) {
          refevent.maxConflictedEvents = conflictedEvents;
        }
      });
    });
    return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  };

  return (
    <div className={styles["calendar-month-container"]}>
      <div className={styles["calendar-month-main-wrapper"]} ref={wrapperRef}>
        <div className={styles["calendar-month-header"]}>
          {week.map((day) => (
            <p className={concatStyles(
              styles["calendar-month-title"],
              getEnumIndex(DayOfWeek, day.dayOfWeek) === 0 ||
                getEnumIndex(DayOfWeek, day.dayOfWeek) === 6
              ? styles["weekend-day"]
              : ""
            )}>{day.dayOfWeek}</p>
          ))}
        </div>

        <div className={styles["calendar-month-table-wrapper"]}>
          <table className={styles["calendar-month-table"]} ref={tableRef}>
            <tbody className={styles["calendar-month-body"]}>
              {cells.map((rows, index) => (
                <tr key={`row-${index}}`}>
                  {rows.map((cell) => (
                    <td
                      align="center"
                      style={{ height: cellHeight }}
                      className={styles["calendar-month-hour-both"]}
                      ref={cellRefs[index]}
                      key={`row-${index}}-cell`}
                    >
                      <p
                        className={concatStyles(
                          styles["cell-day-number"],
                          cell.startDate.getMonth() !== selectedDate.getMonth()
                            ? styles["month-preview"]
                            : "",
                          cell.startDate.getDay() === 0 ||
                            cell.startDate.getDay() === 6
                            ? styles["weekend-day"]
                            : "",
                          cell.startDate.getDate() === today.getDate() &&
                            cell.startDate.getMonth() == today.getMonth()
                            ? styles["current-day"]
                            : "",
                        )}
                      >
                        {cell.startDate.getDate()}
                      </p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles["spinner-wrapper"]}>{loading && <Spinner />}</div>
    </div>
  );
}
