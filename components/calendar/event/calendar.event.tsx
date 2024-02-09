import styles from "./calendar.event.module.sass";

export type EventType = {
  startDate: Date;
  endDate: Date;
  title: string;
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
  const getHeight = (event: EventType) => {
    const initialDate = event.startDate.getTime();
    const finalDate = event.endDate.getTime();
    const minutes = (finalDate - initialDate) / (1000 * 60);

    return ((height + 2 * border) * factor) * (minutes / 60) - 2 * margin;
  };

  const getOffset = (index: number) => {
    return `calc(${index} * (${width} + 2 * ${margin}px) + ${margin}px)`
  }

  return (
    <>
      {events.map((event, index) => {
        return (
          <div
            style={{
              left: getOffset(index),
              width: width,
              height: getHeight(event),
            }}
            className={styles["calendar-event"]}
          >
            {event.title}
          </div>
        );
      })}
    </>
  );
}
