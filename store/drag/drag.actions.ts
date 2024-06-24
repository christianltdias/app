import { ReactNode } from "react";

interface ItemPosition {
  row: number;
  column: number;
}

export interface DragStartAction extends ItemPosition {
}

export interface DragMoveAction extends ItemPosition {
}

export interface DragInitItemsAction {
  items: Array<ReactNode>;
  count?: number;
}

export interface DragPinItemAction extends ItemPosition {
}