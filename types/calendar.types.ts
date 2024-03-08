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
  private events: Array<CalendarEvent>;

  constructor(id: number, startDate: Date, endDate: Date, row: number, column: number){
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.row = row;
    this.column = column;
    this.events = [];
  }  
  
  public addEvent(event: CalendarEvent): void {
    if(!this.events.filter(x => x.id === event.id).length) {
      this.events.push(event)
    }
  }

  public getEvents(): Array<CalendarEvent> {
    return this.events;
  }

  public getEventOrder(event: CalendarEvent): number {
    this.events = this.events.filter(e=> isCellPartOfEvent(event, e)).sort((a, b) => {
      let value = b.parentCell.row - a.parentCell.row;
      if(value === 0){
        value = a.startDate.getTime() - b.endDate.getTime();

        if(value === 0){
          value = a.getTotalConflicts() - b.getTotalConflicts();

          if(value === 0){
            return a.duration - b.duration
          }   
        }
      }

      return value;
    })

    return this.events.findIndex(e => e.id === event.id);
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
  private cells: Array<CalendarCell>;
  private conflicts: number;
  
  constructor(startDate: Date, title: string, type: "low" | "medium" | "important" | "default", endDate?: Date){
    this.id = uuidv4();
    this.startDate = startDate;
    this.endDate = endDate;
    this.title = title
    this.type = type;
    this.isWholeDay = !!endDate;
    this.duration = CalendarEvent.getDuration(startDate, endDate);
    this.cells = []
    this.conflicts = 0;
  }

  public static getDuration(startDate: Date, endDate: Date): number {
    if(!(!!endDate)){
      return 60 * 24;
    }
    const initialDateMiliseconds = startDate.getTime();
    const finalDateMiliseconds = endDate.getTime();
    return (finalDateMiliseconds - initialDateMiliseconds) / (1000 * 60);
  }

  public addCell(cell: CalendarCell): void {
    if(!this.cells.filter(x => x.id === cell.id).length) {
      this.cells.push(cell)
    } 
  }

  public getCells(): Array<CalendarCell> {
    return this.cells;
  }

  public getTotalConflicts(): number {
    return Math.max(...this.cells.map(cell => {
      if(this.conflicts > 0){
        return this.conflicts;
      }
      var events = cell.getEvents().filter(e => e.id !== this.id && isCellPartOfEvent(this, e));
      
      this.conflicts = events.length;
      return this.conflicts;
    }));
  }
}