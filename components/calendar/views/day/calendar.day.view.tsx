import { createRef, useEffect, useRef, useState } from "react";
import Event from "../../event/calendar.event";
import {
  getDayName,
  getTop,
  isCellPartOfEvent,
  mapEvents,
} from "../../../../utils/calendar.utils";
import styles from "./calendar.day.view.module.sass";
import { CalendarCell, CalendarEvent } from "../../../../types/calendar.types";
import { useAppSelector } from "../../../../states/hooks";
import Spinner from "../../../spinner/spinner";
import { BoundaryReference } from "../../../../types/references";

type CalendarDayViewProps = {
  currentDay: Date;
  events: Array<CalendarEvent>;
  cellHeight?: number;
  scrollToCurrentTime?: boolean;
};

export default function CalendarDayView({
  currentDay,
  events,
  cellHeight = 80,
  scrollToCurrentTime = false,
}: CalendarDayViewProps) {
  const wrapperRef = useRef(null);
  const tableRef = useRef(null);

  const factor = useAppSelector((state) => state.calendar.factor);
  const cells = useAppSelector((state) => state.calendar.cells[0]);

  const [cellRefs, setCellRefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mappedEvents, setMappedEvents] = useState<CalendarEvent[]>([]);
  const [top, setTop] = useState<number>(0);

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

  const getTimeTag = (date: Date, onlyExactHours: boolean = true): string => {
    if (date.getMinutes() !== 0 && onlyExactHours) {
      return "";
    }

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
  };

  return (
    <div className={styles["calendar-day-container"]}>
      <div className={styles["calendar-day-main-wrapper"]} ref={wrapperRef}>
        <div className={styles["calendar-day-header"]}>
          {getDayName(currentDay)
            .split(" ")
            .map((daypart) => (
              <p>{daypart}</p>
            ))}
        </div>
        <div className={styles["calendar-day-table-wrapper"]}>
          <div className={styles["calendar-day-time-container"]} style={{gap: `calc(${cellHeight}px - 10pt)`}}>
            {cells.map((cell, index) => <p className={styles["calendar-day-hour-tag"]} key={`row-${index}-key}`}>{getTimeTag(cell.startDate, true)}</p>)}
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
          <hr
            className={styles["calendar-day-hour-line"]}
            style={{ top: top }}
          />
        </div>
      </div>
      <div className={styles["spinner-wrapper"]}>{loading && <Spinner />}</div>
    </div>
  );
}
