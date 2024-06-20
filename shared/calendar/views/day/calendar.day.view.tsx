import { createRef, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../states/hooks";
import { CalendarCell, CalendarEvent } from "../../../../types/calendar.types";
import { BoundaryReference } from "../../../../types/references";
import {
  getDayName,
  getTimeTag,
  getTop,
  isCellPartOfEvent,
  mapEvents,
} from "../../../../utils/calendar.utils";
import Spinner from "../../../spinner/spinner";
import Event from "../../event/calendar.event";
import CalendarControls from "../controls/calendar.controls";
import styles from "./calendar.day.view.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";

type CalendarDayViewProps = {
  events: Array<CalendarEvent>;
  cellHeight?: number;
  scrollToCurrentTime?: boolean;
};

export default function CalendarDayView({
  events,
  cellHeight = 80,
  scrollToCurrentTime = false,
}: CalendarDayViewProps) {
  const wrapperRef = useRef(null);
  const tableRef = useRef(null);
  
  const dispatch = useAppDispatch();

  const factor = useAppSelector((state) => state.calendar.factor);
  const cells = useAppSelector((state) => state.calendar.cells[0]);
  const currentDay = useAppSelector((state) => state.calendar.selectedDate);

  const [cellRefs, setCellRefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mappedEvents, setMappedEvents] = useState<CalendarEvent[]>([]);
  const [top, setTop] = useState<number>(0);

  console.log(events)
  useEffect(() => {
    setCellRefs((elRefs) => cells.map((_, i) => elRefs[i] || createRef()));
    setMappedEvents(getEvents(events, mapEvents(events, cells)));
    setLoading(false);
  }, []);

  useEffect(() => {
    const calculateTop = (): number => {
      var boundary: BoundaryReference<any> =
        tableRef.current.getBoundingClientRect();
      const top = getTop(boundary);
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
      return "calendar-day-hour-both";
    } else if (factor === 2) {
      if (minutes !== 0) {
        return "calendar-day-hour-top";
      }
      return "calendar-day-hour-bottom";
    } else {
      if (minutes === 15 || minutes === 30) {
        return "calendar-day-hour-middle";
      } else if (minutes !== 0) {
        return "calendar-day-hour-top";
      }
      return "calendar-day-hour-bottom";
    }
  };
  const today = new Date();
  return (
    <div className={styles["calendar-day-container"]}>
      <div className={styles["calendar-day-main-wrapper"]} ref={wrapperRef}>
        <div className={styles["calendar-day-header"]}>
          <div className={concatStyles(
            styles["calendar-day-date"],        
            currentDay.getDate() === today.getDate() && currentDay.getMonth() == today.getMonth()
            ? styles["current-day"]
            : "")}
          >
            {getDayName(currentDay)
              .split(" ")
              .map((daypart) => (
                <p>{daypart}</p>
              ))}
          </div>
          <CalendarControls dateText={getDayName(currentDay)} />
        </div>
        <div className={styles["calendar-day-table-wrapper"]}>
          <div
            className={styles["calendar-day-time-container"]}
            style={{ gap: `calc(${factor * cellHeight}px - 10pt - 5px)` }}
          >
            {cells.map((cell, index) => {
              if (index % factor === 0) {
                return (
                  <p
                    className={styles["calendar-day-hour-tag"]}
                    key={`row-${index}-key}`}
                  >
                    {getTimeTag(cell.startDate, true)}
                  </p>
                );
              }
            })}
          </div>
          <table className={styles["calendar-day-table"]} ref={tableRef}>
            <tbody className={styles["calendar-day-table-body"]}>
              {cells.map((cell, index) => (
                <tr key={`row-${index}}`}>
                  <td
                    align="center"
                    style={{ height: cellHeight }}
                    className={styles[getCellStyle(cell)]}
                    ref={cellRefs[index]}
                    key={`row-${index}}-cell`}
                  >
                    {!loading &&
                      mappedEvents
                        .filter((e) => e.parentCell?.id === cell.id)
                        .map((event) => (
                          <Event
                            event={event}
                            margin={5}
                            ref={cellRefs[index]}
                            factor={factor}
                            cell={cell}
                          />
                        ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && (
            <hr
              className={styles["calendar-day-hour-line"]}
              style={{ top: top }}
            />
          )}
        </div>
      </div>
      <div className={styles["spinner-wrapper"]}>{loading && <Spinner />}</div>
    </div>
  );
}
