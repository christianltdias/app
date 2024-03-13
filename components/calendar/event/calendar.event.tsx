import { MutableRefObject, forwardRef, useEffect, useState } from "react";
import { concatStyles } from "../../../utils/styles.utils";
import { CalendarCell, CalendarEvent } from "../../../types/calendar.types";
import styles from "./calendar.event.module.sass";
import { BoundaryReference } from "../../../types/references";

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
  const [boundary, setBoundary] = useState<Partial<BoundaryReference<any>>>({width: 0, height: 0})

  const total = event.getTotalConflicts();

  const eventsOrdered = [...event.maxConflictedEvents, event].sort((a, b) => {
      let value = a.maxConflictedEvents.length - b.maxConflictedEvents.length;
      if(value === 0){
        return b.duration - a.duration
      } 
    return value;
  });

  const index = eventsOrdered.findIndex(e => e.id === event.id) - (event.maxConflictedEvents.length - total);

  const leftOffset = (width: number): number =>{
    return width * index + (2 * index + 1) * margin;
  }

  const topOffset = (): number => {
    const minutes = CalendarEvent.getDuration(cell.startDate, event.startDate);
    return boundary.height * minutes * factor / 60 + margin;
  };

  const calculateExtra = (): number => {   
    const maxconflicts = Math.max(...event.maxConflictedEvents.map(e => e.maxConflictedEvents.length));
    if(maxconflicts > total){
      return Math.abs(maxconflicts > 0 ? boundary.width / (total + 1) - boundary.width / (maxconflicts) : 0);
    }
    return 0;
  }

  const calculateWidth = (boundaryBox: Partial<BoundaryReference<any>>, conflicts: number): number => {
    const extraSize = calculateExtra();
    return boundaryBox.width / (conflicts + 1) + extraSize - 2 * margin;
  }

  const calculateHeight = (boundaryBox: Partial<BoundaryReference<any>>): number => (boundaryBox.height * event.duration * factor / 60) - 2 * margin;
  
  useEffect(() => {
    if(forwardedRef && forwardedRef.current) {
      var boundary: Partial<BoundaryReference<any>> = forwardedRef.current.getBoundingClientRect();
      setBoundary(boundary)
    }
  }, [forwardedRef])

  const width = calculateWidth(boundary, total);
  const height = calculateHeight(boundary);

  return (
    <>
      {forwardedRef && forwardedRef.current &&
        <div
          key={`event-${event.id}`}
          style={{
            left: leftOffset(width),
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