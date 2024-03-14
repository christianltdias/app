import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../states/hooks";
import { CalendarCell, CalendarEvent } from "../../../../types/calendar.types";
import {
  isCellPartOfEvent
} from "../../../../utils/calendar.utils";
import { createWeekArray } from "../../../../utils/date.utils";
import Spinner from "../../../spinner/spinner";
import styles from "./calendar.month.view.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";

type CalendarDayViewProps = {
  currentDay: Date;
  events: Array<CalendarEvent>;
  cellHeight?: number;
  scrollToCurrentTime?: boolean;
};

export default function CalendarMonthView({
  currentDay,
  events,
  cellHeight = 160,
  scrollToCurrentTime = false,
}: CalendarDayViewProps) {
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

  useEffect(() => {
  }, [wrapperRef, tableRef]);

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

  const getCellStyle = (cell: CalendarCell): string => {
    const minutes = cell.startDate.getMinutes();
    if (factor === 1) {
      return "calendar-hour-both";
    } else if (factor === 2) {
      if (minutes !== 0) {
        return "calendar-hour-top";
      }
      return "calendar-hour-bottom";
    } else {
      if (minutes === 15 || minutes === 30) {
        return "calendar-hour-middle";
      } else if (minutes !== 0) {
        return "calendar-hour-top";
      }
      return "calendar-hour-bottom";
    }
  };

  return (
    <div className={styles["calendar-day-container"]}>
      <div className={styles["calendar-day-wrapper"]} ref={wrapperRef}>
        <table className={styles["calendar-day-table"]} ref={tableRef}>
          <thead>
            <tr className={styles["calendar-day-header"]}>
              {week.map((day) => (
                <th align="left" className={styles["calendar-day-title"]}>
                  {day.dayOfWeek}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles["calendar-day-body"]}>
            {cells.map((rows, index) => (
              <tr key={`row-${index}}`}>
                {rows.map((cell) => (
                  <td
                    align="center"
                    style={{ height: cellHeight }}
                    className={styles[getCellStyle(cell)]}
                    ref={cellRefs[index]}
                    key={`row-${index}}-cell`}
                  >
                    <p className={concatStyles(
                      styles["cell-day-number"],
                      cell.startDate.getMonth() !== selectedDate.getMonth() ? styles["month-preview"] : "",
                      cell.startDate.getDate() === today.getDate() && cell.startDate.getMonth() == today.getMonth() ? styles["current-day"] : "",
                      )}>
                        {cell.startDate.getDate()}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles["spinner-wrapper"]}>{loading && <Spinner />}</div>
    </div>
  );
}
