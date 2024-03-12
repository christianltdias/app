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
  maxConflictedEvents: CalendarEvent[];
  column: number | undefined;
  
  constructor(startDate: Date, title: string, type: "low" | "medium" | "important" | "default", endDate?: Date){
    this.id = uuidv4();
    this.startDate = startDate;
    this.endDate = endDate;
    this.title = title
    this.type = type;
    this.isWholeDay = !!endDate;
    this.duration = CalendarEvent.getDuration(startDate, endDate);
    this.maxConflictedEvents = [];
    this.column = undefined;
  }

  public static getDuration(startDate: Date, endDate: Date): number {
    if(!(!!endDate)){
      return 60 * 24;
    }
    const initialDateMiliseconds = startDate.getTime();
    const finalDateMiliseconds = endDate.getTime();
    return (finalDateMiliseconds - initialDateMiliseconds) / (1000 * 60);
  }

  public getTotalConflicts(): number {
    const maxtotal = Math.max(...this.maxConflictedEvents.map(x => x.maxConflictedEvents.length));
    return maxtotal < this.maxConflictedEvents.length ? maxtotal : this.maxConflictedEvents.length;
  }
}