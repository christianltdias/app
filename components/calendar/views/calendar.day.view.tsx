import { useEffect, useRef, useState } from "react";
import { CurrentTab } from "../calendar";
import Event, { EventType } from "../event/calendar.event";
import { getDayName, getTop } from "../utils/calendar.utils";
import styles from "./calendar.view.module.sass";

type CalendarDayViewProps = {
  currentDay: CurrentTab,
  events: Array<EventType>,
  cellHeight?: number, 
};

export default function CalendarDayView({ currentDay, events, cellHeight = 80 }: CalendarDayViewProps) {
  const wrapperRef = useRef(null);
  
  const [factor, setFactor] = useState<1 | 2 | 4> (1);
  const [hours, setHours] = useState<Array<number>> (Array.from(Array(24 * factor).keys()));
  
  const currentDayDate = new Date()
  const top = getTop(currentDayDate, cellHeight + 4, factor, 5) + 50

  useEffect(()=> {
    scrollToCurrent();
  }, [wrapperRef])

  const getMinutes = (hour: number): number => {
    const residual = hour % factor;

    if (residual === 0){
      return 0;
    } else if (factor === 2) {
      return 30;
    } else if (residual === 1){
      return 15;
    } else if (residual === 2){
      return 30
    } else if (residual === 3){
      return 45
    }

    return 0;
  }

  const scrollToCurrent = () => {
    wrapperRef.current.scrollTo({
      behavior: "smooth",
      top: top,
    })
  }

  const getCellStyle = (hour: number): string => {
    if(factor === 1){
      return 'calendar-hour-both'
    }
    else if (factor === 2 ){
      if(hour % factor){
        return 'calendar-hour-top'
      }
      return 'calendar-hour-bottom'
    }
    else {
      if(hour % factor === 1 || hour % factor === 2){
        return 'calendar-hour-middle'
      } else if(hour % factor === 3){
        return 'calendar-hour-top'
      }
      return 'calendar-hour-bottom'
    }
  }

  const getTimeTag = (index: number, onlyExactHours: boolean = true): string => {
    const minutes =  getMinutes(index % factor);
    
    if(onlyExactHours&& index % factor){
      return ''; 
    }
    const hour = Math.floor(index / factor);

    return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`
  };

  return (
    <div className={styles["calendar-day-container"]}>
      <div className={styles["calendar-day-wrapper"]} ref={wrapperRef}>
        <table className={styles["calendar-day-table"]}>
          <thead>
            <tr className={styles["calendar-day-header"]}>
              <th className={styles["calendar-day-time-title"]}>Time</th>
              <th align="left" className={styles["calendar-day-title"]} onClick={scrollToCurrent}>
                {getDayName(currentDay)}
              </th>
            </tr>
          </thead>
          <tbody className={styles["calendar-day-body"]}>
            {hours.map((hour, index) => (
              <tr key={`row-${index}}`}>
                <td valign="top" className={styles["calendar-day-tag"]}>
                  {getTimeTag(hour, true)}
                </td>
                <td
                  align="center"
                  style={{height: cellHeight}}
                  className={styles[getCellStyle(hour)]}
                >
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles["calendar-events"]}>
          <Event events={events} factor={factor} height={cellHeight + 4} margin={5}/>
        </div>
        <hr className={styles["calendar-hour-line"]} style={{top: top}}/>
      </div>
    </div>
  );
}
