import { ReactNode, useRef, useState } from "react";
import { concatStyles } from "../../../utils/styles.utils";
import { CurrentTab } from "../calendar";
import styles from "./calendar.view.module.sass";
import { EventType } from "../event/calendar.event";
import Event from "../event/calendar.event";

type CalendarDayViewProps = {
  currentDay: CurrentTab;
  events: Array<EventType>,
};

export default function CalendarDayView({ currentDay, events }: CalendarDayViewProps) {
  const [factor, setFactor] = useState<1 | 2 | 4> (4);
  const [hours, setHours] = useState<Array<number>> (Array.from(Array(24 * factor).keys()));
  
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
      <div className={styles["calendar-day-wrapper"]}>
        <table className={styles["calendar-day-table"]}>
          <thead>
            <tr className={styles["calendar-day-header"]}>
              <th style={{backgroundColor: 'white'}}>Time</th>
              <th align="left" className={styles["calendar-day-title"]}>
                {currentDay.day} - {currentDay.month} - {currentDay.year}
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
                  className={concatStyles(
                    styles["calendar-hour"],
                    styles[getCellStyle(hour)]
                  )}
                >
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles["calendar-events"]}>
          <Event border={2} events={events} factor={factor} height={40} margin={5}/>
        </div>
      </div>
    </div>
  );
}
