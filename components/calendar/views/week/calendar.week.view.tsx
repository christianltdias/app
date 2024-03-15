import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../states/hooks";
import { CalendarCell, CalendarEvent } from "../../../../types/calendar.types";
import { BoundaryReference } from "../../../../types/references";
import { getTimeTag, getTop, isCellPartOfEvent } from "../../../../utils/calendar.utils";
import { createWeekArray } from "../../../../utils/date.utils";
import Spinner from "../../../spinner/spinner";
import styles from "./calendar.week.view.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";

type CalendarDayViewProps = {
  currentDay: Date;
  events: Array<CalendarEvent>;
  cellHeight?: number;
  scrollToCurrentTime?: boolean;
};

export default function CalendarWeekView({
  currentDay,
  events,
  cellHeight = 80,
  scrollToCurrentTime = false,
}: CalendarDayViewProps) {
  const wrapperRef = useRef(null);
  const tableRef = useRef(null);

  const factor = useAppSelector((state) => state.calendar.factor);
  const cells = useAppSelector((state) => state.calendar.cells);
  const today = new Date();

  const [cellRefs, setCellRefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mappedEvents, setMappedEvents] = useState<CalendarEvent[]>([]);
  const [top, setTop] = useState<number>(0);

  const week = createWeekArray(currentDay);

  useEffect(() => {
    // setCellRefs((elRefs) => cells.map((_, i) => elRefs[i] || createRef()));
    // setMappedEvents(getEvents(events, mapEvents(events, cells)));
    setLoading(false);
  }, []);

  useEffect(() => {
    const calculateTop = (): number => {
      var boundary: BoundaryReference<any> =
        tableRef.current.getBoundingClientRect();
      const top = getTop(boundary, 15);
      setTop(top);
      return top;
    };

    const interval = setInterval(() => {
      calculateTop();
    }, 60000);

    const topvalue = calculateTop();
    if (scrollToCurrentTime) {
      scrollToCurrent(topvalue);
    }

    return () => clearInterval(interval);
  }, [wrapperRef, tableRef]);

  const scrollToCurrent = (top: number) => {
    wrapperRef.current.scrollTo({
      behavior: "smooth",
      top: top - 150,
    });
  };

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
      return "calendar-week-hour-both";
    } else if (factor === 2) {
      if (minutes !== 0) {
        return "calendar-week-hour-top";
      }
      return "calendar-week-hour-bottom";
    } else {
      if (minutes === 15 || minutes === 30) {
        return "calendar-week-hour-middle";
      } else if (minutes !== 0) {
        return "calendar-week-hour-top";
      }
      return "calendar-week-hour-bottom";
    }
  };

  const cellsMatrix = cells[0].map((_, colIndex) =>
    cells.map((row) => row[colIndex])
  );

  return (
    <div className={styles["calendar-week-container"]}>
      <div className={styles["calendar-week-main-wrapper"]} ref={wrapperRef}>
        <div className={styles["calendar-week-header"]}>
          {week.map((day) => (
            <div
              className={concatStyles(
                styles["calendar-week-title"],
                day.day === today.getDate() && day.month == today.getMonth()
                  ? styles["current-day"]
                  : ""
              )}
            >
              <p className={styles["day-title-week"]}>{day.day}</p>
              <p className={styles["day-title-week-day"]}>{day.dayOfWeek}</p>
            </div>
          ))}
        </div>
        <div className={styles["calendar-week-table-wrapper"]}>
          <div
            className={styles["calendar-week-time-container"]}
            style={{ gap: `calc(${cellHeight}px - 10pt)` }}
          >
            {cells[0].map((cell, index) => (
              <p
                className={styles["calendar-week-hour-tag"]}
                key={`row-${index}-key}`}
              >
                {getTimeTag(cell.startDate, true)}
              </p>
            ))}
          </div>
          <table className={styles["calendar-week-table"]} ref={tableRef}>
            <tbody className={styles["calendar-week-body"]}>
              {cellsMatrix.map((rows, index) => (
                <tr key={`row-${index}}`}>
                  {rows.map((cell) => (
                    <td
                      align="center"
                      style={{ height: cellHeight }}
                      className={styles[getCellStyle(cell)]}
                      ref={cellRefs[index]}
                      key={`row-${index}}-cell`}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <hr className={styles["calendar-week-hour-line"]} style={{ top: top }} />
        </div>
      </div>
      <div className={styles["spinner-wrapper"]}>{loading && <Spinner />}</div>
    </div>
  );
}
