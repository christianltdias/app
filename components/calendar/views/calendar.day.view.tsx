import { createRef, useEffect, useRef, useState } from "react";
import Event from "../event/calendar.event";
import {
  getDayName,
  getTop,
  isCellPartOfEvent,
  mapEvents,
} from "../../../utils/calendar.utils";
import styles from "./calendar.view.module.sass";
import { CalendarCell, CalendarEvent } from "../../../types/calendar.types";
import { useAppSelector } from "../../../states/hooks";
import Spinner from "../../spinner/spinner";
import { BoundaryReference } from "../../../types/references";

type CalendarDayViewProps = {
  currentDay: Date;
  events: Array<CalendarEvent>;
  cellHeight?: number;
};

export default function CalendarDayView({
  currentDay,
  events,
  cellHeight = 80,
}: CalendarDayViewProps) {
  const wrapperRef = useRef(null);
  const tableRef = useRef(null);
  
  const factor = useAppSelector(state => state.calendar.factor);
  const hours = useAppSelector(state => state.calendar.cells);

  const [cellRefs, setCellRefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cells, _] = useState<CalendarCell[]>(mapEvents(events, hours));
  const [mappedEvents, setMappedEvents] = useState<CalendarEvent[]>([]);
  const [top, setTop] = useState<number>(0);

  useEffect(() => {
    setCellRefs((elRefs) => hours.map((_, i) => elRefs[i] || createRef()));
    setMappedEvents(getEvents(events, cells));
    setLoading(false);
  }, []);

  useEffect(() => {
    const calculateTop = (): number => {
      var boundary: BoundaryReference<any> = tableRef.current.getBoundingClientRect();
      const top = getTop(boundary, 15);
      setTop(top);
      return top;
    }

    const interval = setInterval(() => {
       calculateTop();
    }, 60000);
    
    scrollToCurrent(calculateTop());
    return () => clearInterval(interval);

  }, [wrapperRef, tableRef]);

  const scrollToCurrent = (top: number) => {
    wrapperRef.current.scrollTo({
      behavior: "smooth",
      top: top - 150,
    });
  };

  const getEvents = (events: CalendarEvent[], cells: CalendarCell[]): CalendarEvent[] => {
    cells.map(cell => {
      var cellEvents = events.filter(event => isCellPartOfEvent(event, cell))
      cellEvents.map(refevent => {
        var conflictedEvents = events.filter(event => refevent.id !== event.id && isCellPartOfEvent(refevent, event))
        if(refevent.maxConflictedEvents.length < conflictedEvents.length){
          refevent.maxConflictedEvents = conflictedEvents;
        }
      })
    })
    return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

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
      <div className={styles["calendar-day-wrapper"]} ref={wrapperRef}>
        <table className={styles["calendar-day-table"]} ref={tableRef}>
          <thead>
            <tr className={styles["calendar-day-header"]}>
              <th className={styles["calendar-day-time-title"]}>Time</th>
              <th
                align="left"
                className={styles["calendar-day-title"]}
                onClick={() => scrollToCurrent(top)}
              >
                {getDayName(currentDay)}
              </th>
            </tr>
          </thead>
          <tbody className={styles["calendar-day-body"]}>
            {cells.map((cell, index) => (
              <tr key={`row-${index}}`}>
                <td valign="top" className={styles["calendar-day-tag"]} key={`row-${index}-key}`}>
                  {getTimeTag(cell.startDate, true)}
                </td>
                <td
                  align="center"
                  style={{ height: cellHeight }}
                  className={styles[getCellStyle(cell)]}
                  ref={cellRefs[index]}
                  key={`row-${index}}-cell`}
                >
                  {!loading && mappedEvents.filter(e => e.parentCell?.id === cell.id).map((event) => (
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
        <hr className={styles["calendar-hour-line"]} style={{top: top}}/>
      </div>
        <div className={styles["spinner-wrapper"]}>
          {loading && <Spinner />}
        </div>
    </div>
  );
}
