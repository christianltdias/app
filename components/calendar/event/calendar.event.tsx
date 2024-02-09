import { concatStyles } from "../../../utils/styles.utils";
import styles from "./calendar.event.module.sass";

export type EventType = {
  startDate: Date;
  endDate: Date;
  title: string;
  type: "low" | "medium" | "important" | "default"
};

export type EventProps = {
  events: Array<EventType>;
  factor: 1 | 2 | 4;
  height: number;
  border: number;
  margin: number;
};

export default function Event({
  events,
  height,
  border,
  margin,
  factor,
}: EventProps) {

  const width = `calc(${100 / events.length}% - ${2 * margin}px)`;

  const getMinutes = (initialDate: Date, finalDate: Date): number => {
    const initialDateMiliseconds = initialDate.getTime();
    const finalDateMiliseconds = finalDate.getTime();
    return (finalDateMiliseconds - initialDateMiliseconds) / (1000 * 60);
  }

  const getHeight = (event: EventType) => {
    const minutes = getMinutes(event.startDate, event.endDate);
    var eventSize = ((height + 2 * border) * factor) * (minutes / 60) - 2 * margin;
    return `max(${eventSize}px, ${height}px)`
  };

  const getTop = (event: EventType) => {
    const minutes = getMinutes(new Date(event.startDate.getFullYear(), event.startDate.getMonth(), event.startDate.getDate()), event.startDate);
    return ((height + 2 * border) * factor) * (minutes / 60) + margin;
  };

  const getOffset = (index: number) => {
    return `calc(${index} * (${width} + 2 * ${margin}px) + ${margin}px)`
  }

  return (
    <>
      {events.map((event, index) => {
        return (
          <div
            key={`event-${event.title}-${index}`}
            style={{
              left: getOffset(index),
              width: width,
              height: getHeight(event),
              top: getTop(event),
            }}
            className={concatStyles(styles["calendar-event"], styles[event.type])}
          >
            {event.startDate.getHours()}:{event.startDate.getMinutes()} - {event.title}
          </div>
        );
      })}
    </>
  );
}
