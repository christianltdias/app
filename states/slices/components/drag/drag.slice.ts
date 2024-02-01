import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DragInitItemsAction, DragMoveAction, DragStartAction } from "./drag.actions";
import { DragItemProps } from "../../../../components/container/drag/item/dragitem";
import { convertToMatrix } from "../../../../components/container/drag/drag.utils";
import { ReactNode } from "react";

export interface IDragState {
  dragging: boolean;
  activeCell: {row: number, column: number} | null;
  activeItem: {row: number, column: number} | null;
  items: Array<Array<DragItemProps>>;
}

const initialState: IDragState = {
  dragging: false,
  activeCell: null,
  activeItem: null,
  items: [],
};

export const dragSlice = createSlice({
  name: "drag",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<DragInitItemsAction>){  
      const count = action.payload.count;
      const maxcount = count ? count : action.payload.items.length;
      state.items = convertToMatrix<ReactNode>(action.payload.items, maxcount);
    },
    setActiveItem: (state, action: PayloadAction<DragStartAction>) => {
      state.dragging = true;
      state.activeItem = {row: action.payload.row, column: action.payload.column}
      state.activeCell = {row: action.payload.row, column: action.payload.column}
    },
    applyMovement: (state) => {
      const activeItem = state.activeItem;
      const activeCell = state.activeCell;
      const containeritems = state.items;

      if(activeItem.row !== activeCell.row || activeItem.column !== activeCell.column) {
        const temp = containeritems[activeCell.row][activeCell.column]
        containeritems[activeCell.row][activeCell.column] = containeritems[activeItem.row][activeItem.column]
        containeritems[activeItem.row][activeItem.column] = temp
      }

      state.dragging = false;
      state.activeItem = null;
      state.activeCell = null;
      state.items = containeritems;
    },
    setActiveCell: (state, action: PayloadAction<DragMoveAction>) => {
      state.activeCell = {row: action.payload.row, column: action.payload.column}
    }
  },
});

export const { setItems, setActiveItem, applyMovement, setActiveCell } = dragSlice.actions;
export const dragReducer = dragSlice.reducer;