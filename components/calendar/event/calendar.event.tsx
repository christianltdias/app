import { concatStyles } from "../../../utils/styles.utils";
import { getHeight, getMinutes, getTop } from "../utils/calendar.utils";
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

type EventComponent = {
  id: number,
  top: number,
  height: number,
  // left: string,
  duration: number,
  event: EventType,
  conflicts: Array<EventComponent>,
}

export default function Event({
  events,
  height,
  margin,
  factor,
}: EventProps) {

  const width = (event: EventComponent) => {
    var conflicts = event.conflicts.length === 1 ? 1 : Math.max(...event.conflicts.map(x => x.conflicts.length))
    return `calc(${100 / (conflicts + 1) }% - ${2 * margin}px)`;
  };

  const RemainingWidth = (conflicts: EventComponent) => `calc(100% - ${width(conflicts)})`;

  const getEvents = () : Array<EventComponent> => {
    const components = events
    .map((event, index) => {
      return {
        id: index,
        event,
        height: getHeight(event.startDate, event.endDate, height, factor, margin),
        top: getTop(event.startDate, height, factor, margin),
        duration: getMinutes(event.startDate, event.endDate),
        conflicts: [],
      }
    });
    
    components.forEach(event => {
      const isOverlapped = (anchor: EventComponent, ref: EventComponent) => {
        const ancS = anchor.event.startDate;
        const ancE = anchor.event.endDate;
        const refS = ref.event.startDate;
        const refE = ref.event.endDate;
        return refS < ancS && (refE <= ancE && refE > ancS) ||
          (refS >= ancS && refS < ancE) && (refE <= ancE && refE > ancS) ||
          (refS >= ancS && refS < ancE) && refE > ancE  ||
          refS <= ancS && refE >= ancE;
      }

      const occurences = components
        .filter(x => x.id !== event.id && isOverlapped(event, x));

      event.conflicts = occurences; 
    })

    return components;
  }

  const getOffset = (event: EventComponent): string => {
    const index = 0
    return `calc(${index} * (${RemainingWidth(event)} + 2 * ${margin}px) + ${margin}px)`
  }

  return (
    <>
      {getEvents().map((component, index) => {
        return (
          <div
            key={`event-${component.event.title}-${index}`}
            style={{
              left: getOffset(component),
              width: width(component),
              height: component.height,
              top: component.top,
            }}
            className={concatStyles(styles["calendar-event"], styles[component.event.type])}
          >
            <p>{component.event.title}-{component.conflicts.length}-{component.conflicts.map(x => x.event.title).join(', ')}</p>
          </div>
        );
      })}
    </>
  );
}
