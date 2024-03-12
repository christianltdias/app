import { MutableRefObject, forwardRef, useEffect, useState } from "react";
import { concatStyles } from "../../../utils/styles.utils";
import { CalendarCell, CalendarEvent } from "../../../types/calendar.types";
import styles from "./calendar.event.module.sass";
import { useAppSelector } from "../../../states/hooks";
import { isCellPartOfEvent } from "../../../utils/calendar.utils";
import { BoundaryReference } from "../../../types/references";

export type EventProps = {
  events: CalendarEvent[];
  event: CalendarEvent;
  margin: number;
  factor: number;
  cell: CalendarCell;
};

const Event= forwardRef(({
  events,
  event,
  margin,
  factor,
  cell
}: EventProps, forwardedRef: MutableRefObject<any>) => {
  const [boundary, setBoundary] = useState<Partial<BoundaryReference<any>>>({width: 0, height: 0})

  const cells = useAppSelector(state => state.calendar.cells);

  const total = CalendarEvent.getTotalConflicts(event, cells, events);
  const eventsOrdered = CalendarCell.getEventsOrdered(event, cells, events);
  const index = eventsOrdered.findIndex(e => e.id === event.id);

  const leftOffset = (width: number): number =>{
    var eventWidth = width
    if(index !== 0){
      eventWidth = Math.abs(calculateWidth(boundary, CalendarEvent.getTotalConflicts(eventsOrdered[index - 1], cells, events), true));
    }
    return eventWidth * index + (2 * index + 1) * margin;
  }

  const topOffset = (): number => {
    const minutes = CalendarEvent.getDuration(cell.startDate, event.startDate);
    return boundary.height * minutes * factor / 60 + margin;
  };

  const calculateExtra = (offset: boolean = false): number => {   
    if(total === 0){
      return 0;
    }
    let extra = 0;
    if(index === 0){
      extra = Math.max(...eventsOrdered.map(e => CalendarEvent.getTotalConflicts(e, cells, events)));
    }
    else {
      extra = CalendarEvent.getTotalConflicts(eventsOrdered[index - 1], cells, events);
      if((!offset && extra < total) || extra === total){
        return 0;
      }

      return Math.abs(extra > 0 ? boundary.width / (total + 1) - boundary.width / (extra + 1) : 0);
    }

    return Math.abs(extra > 0 ? boundary.width / (total + 1) - boundary.width / (extra + 1) : 0);
  }

  const calculateWidth = (boundaryBox: Partial<BoundaryReference<any>>, conflicts: number, offset: boolean = false): number => {
    const extraSize = calculateExtra(offset);
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
          <p>{event.title} - {total} - {index} - {calculateExtra()}</p>
          <p>{events.filter(e=> isCellPartOfEvent(event, e)).map(e => e.title).join(' , ')}</p>
        </div>
      }
    </>
  );
})

export default Event;