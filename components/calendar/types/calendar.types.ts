export class CalendarCell {
  startDate: Date;
  endDate: Date;
  row: number;
  column: number;
  events: Array<CalendarEvent>;

  constructor(startDate: Date, endDate: Date, row: number, column: number, events: Array<CalendarEvent>){
    this.startDate = startDate;
    this.endDate = endDate;
    this.row = row;
    this.column = column;
    this.events = events;
  }
}

export class CalendarEvent {
  startDate: Date;
  endDate?: Date;
  title: string;
  type: "low" | "medium" | "important" | "default";
  isWholeDay: boolean;
  duration: number;
  private cells: Array<CalendarCell>;
  
  constructor(startDate: Date, title: string, type: "low" | "medium" | "important" | "default", endDate?: Date){
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

  public setCells(cells: Array<CalendarCell>): void {
    this.cells = cells;
  }

  public getCells(): Array<CalendarCell> {
    return this.cells;
  }
}