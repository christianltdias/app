import { createRef, useEffect, useRef, useState } from "react";
import Event from "../event/calendar.event";
import {
  getDayName,
  getTop,
} from "../../../utils/calendar.utils";
import styles from "./calendar.view.module.sass";
import { CalendarCell, CalendarEvent } from "../../../types/calendar.types";
import { useAppDispatch, useAppSelector } from "../../../states/hooks";
import { setCells } from "../../../states/slices/components/calendar/calendar.slice";

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
  const dispatch = useAppDispatch();
  
  const factor = useAppSelector(state => state.calendar.factor);
  const hours = useAppSelector(state => state.calendar.cells);
  const [cellRefs, setCellRefs] = useState([]);

  const top = getTop(currentDay, cellHeight + 4, factor, 5) + 50;

  useEffect(() => {
    setCellRefs((elRefs) => hours.map((_, i) => elRefs[i] || createRef()));
    dispatch(setCells({cells: hours, events}))
  }, []);

  useEffect(() => {
    // scrollToCurrent();
  }, [wrapperRef]);

  const scrollToCurrent = () => {
    wrapperRef.current.scrollTo({
      behavior: "smooth",
      top: top,
    });
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
        <table className={styles["calendar-day-table"]}>
          <thead>
            <tr className={styles["calendar-day-header"]}>
              <th className={styles["calendar-day-time-title"]}>Time</th>
              <th
                align="left"
                className={styles["calendar-day-title"]}
                onClick={scrollToCurrent}
              >
                {getDayName(currentDay)}
              </th>
            </tr>
          </thead>
          <tbody className={styles["calendar-day-body"]}>
            {hours.map((cell, index) => (
              <tr key={`row-${index}}`}>
                <td valign="top" className={styles["calendar-day-tag"]}>
                  {getTimeTag(cell.startDate, true)}
                </td>
                <td
                  align="center"
                  style={{ height: cellHeight }}
                  className={styles[getCellStyle(cell)]}
                  ref={cellRefs[index]}
                >
                  {events.filter(e => e.parentCell?.id === cell.id).map((event) => (
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
        {/* <hr className={styles["calendar-hour-line"]} style={{top: top}}/> */}
      </div>
    </div>
  );
}
