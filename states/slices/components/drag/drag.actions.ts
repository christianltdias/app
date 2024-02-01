import { ReactNode } from "react";

export interface DragStartAction {
  row: number;
  column: number;
}

export interface DragMoveAction {
  row: number;
  column: number;
}

export interface DragInitItemsAction {
  items: Array<ReactNode>;
  count?: number;
}