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
  margin: number;
};

export default function Event({
  events,
  height,
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
    var eventSize = (height * factor) * (minutes / 60) - 2 * margin;
    return eventSize
  };

  const getTop = (event: EventType) => {
    const minutes = getMinutes(new Date(event.startDate.getFullYear(), event.startDate.getMonth(), event.startDate.getDate()), event.startDate);
    return (height * factor) * (minutes / 60) + margin;
  };

  const getOffset = (index: number) => {
    return `calc(${index} * (${width} + 2 * ${margin}px) + ${margin}px)`
  }

  const test = (initialDate: Date, finalDate: Date) => {
    const minutes = getMinutes(initialDate, finalDate);
    const hours = Math.floor(minutes / 60);
    return `duration: ${hours} hour(s) and ${minutes % 60} minute(s)`
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
            <p>{event.title}</p>
          </div>
        );
      })}
    </>
  );
}
