import { MutableRefObject, forwardRef, useEffect, useState } from "react";
import { concatStyles } from "../../../utils/styles.utils";
import { CalendarCell, CalendarEvent } from "../../../types/calendar.types";
import styles from "./calendar.event.module.sass";

export type EventProps = {
  event: CalendarEvent;
  margin: number;
  factor: number;
  cell: CalendarCell;
};

const Event= forwardRef(({
  event,
  margin,
  factor,
  cell
}: EventProps, forwardedRef: MutableRefObject<any>) => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [boundary, setBoundary] = useState<{width: number, height: number}>({width: 0, height: 0})

  const total = event.getTotalConflicts();
  const index = cell.getEventOrder(event)
  const extra = Math.max(...event.getCells().map(c => {
    var element = c.getEvents().find(e => e.getTotalConflicts() > total);
    if(element){
      return element.getTotalConflicts();
    }

    return 0;
  }))

  const leftOffset = (): number => width * index + (2 * index + 1) * margin
  const topOffset = (): number => {
    const minutes = CalendarEvent.getDuration(cell.startDate, event.startDate);
    return boundary.height * minutes * factor / 60 + margin;
  };
  
  useEffect(() => {
    if(forwardedRef && forwardedRef.current) {
      var boundary = forwardedRef.current.getBoundingClientRect();
      var extraSize = extra > 0 ? boundary.width / (total + 1) - boundary.width / (extra + 1) : 0 
      setWidth(boundary.width / (total + 1) + extraSize - 2 * margin)
      setHeight((boundary.height * event.duration * factor / 60) - 2 * margin)
      setBoundary({width: boundary.width, height: boundary.height})
    }
  }, [forwardedRef])

  return (
    <>
      {forwardedRef && forwardedRef.current &&
        <div
          key={`event-${event.id}`}
          style={{
            left: leftOffset(),
            width,
            height,
            top: topOffset(),
          }}
          className={concatStyles(styles["calendar-event"], styles[event.type])}
        >
          <p>{event.title}</p>
        </div>
      }
    </>
  );
})

export default Event;