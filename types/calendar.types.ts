import { isCellPartOfEvent } from "../utils/calendar.utils";
import { uuidv4 } from "../utils/id.utils";

export enum CalendarView {
  Day,
  Month, 
  Year
}

export class CalendarCell {
  id: number;
  startDate: Date;
  endDate: Date;
  row: number;
  column: number;

  constructor(id: number, startDate: Date, endDate: Date, row: number, column: number){
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.row = row;
    this.column = column;
  }  

  public static getEventsOrdered(event: CalendarEvent, cells: CalendarCell[], events: CalendarEvent[]): CalendarEvent[] {
    return events.filter(e=> e.id === event.id || isCellPartOfEvent(event, e)).sort((a, b) => {
      let value = a.parentCell.row - b.parentCell.row;
      if(value === 0){
        value = b.startDate.getTime() - a.endDate.getTime();

        if(value === 0){
          value = CalendarEvent.getTotalConflicts(a, cells, events) - CalendarEvent.getTotalConflicts(b, cells, events);

          if(value === 0){
            return b.duration - a.duration
          }   
        }
      }

      return value;
    })
  }
}

export class CalendarEvent {
  id: string;
  startDate: Date;
  endDate?: Date;
  title: string;
  type: "low" | "medium" | "important" | "default";
  isWholeDay: boolean;
  duration: number;
  parentCell: CalendarCell;
  
  constructor(startDate: Date, title: string, type: "low" | "medium" | "important" | "default", endDate?: Date){
    this.id = uuidv4();
    this.startDate = startDate;
    this.endDate = endDate;
    this.title = title
    this.type = type;
    this.isWholeDay = !!endDate;
    this.duration = CalendarEvent.getDuration(startDate, endDate);
  }

  public static getDuration(startDate: Date, endDate: Date): number {
    if(!(!!endDate)){
      return 60 * 24;
    }
    const initialDateMiliseconds = startDate.getTime();
    const finalDateMiliseconds = endDate.getTime();
    return (finalDateMiliseconds - initialDateMiliseconds) / (1000 * 60);
  }

  public static getTotalConflicts(event: CalendarEvent, cells: CalendarCell[], events: CalendarEvent[]): number {
    return Math.max(...cells.filter(c => isCellPartOfEvent(event, c)).map(cell => {
      return events.filter(e => e.id !== event.id && isCellPartOfEvent(e, cell) && isCellPartOfEvent(event, e)).length;
    }));
  }
}