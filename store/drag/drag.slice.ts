import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DragInitItemsAction, DragMoveAction, DragPinItemAction, DragStartAction } from "./drag.actions";
import { DragItemProps } from "../../shared/container/drag/item/dragitem";
import { convertToMatrix } from "../../shared/container/drag/drag.utils";
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
      if(state.activeItem && 
        (state.dragging || state.activeItem.row === action.payload.row || state.activeItem.column === action.payload.column)){
        return;
      }

      state.dragging = true;
      state.activeItem = {row: action.payload.row, column: action.payload.column}
      state.activeCell = {row: action.payload.row, column: action.payload.column}
    },
    applyMovement: (state) => {
      const activeItem = state.activeItem;
      const activeCell = state.activeCell;
      const containeritems = state.items;

      if(activeItem && (activeItem.row !== activeCell.row || activeItem.column !== activeCell.column)) {
        const temp = containeritems[activeCell.row][activeCell.column]
        if(!temp.pinned) {
          containeritems[activeCell.row][activeCell.column] = containeritems[activeItem.row][activeItem.column]
          containeritems[activeItem.row][activeItem.column] = temp
          state.items = containeritems;
        }
      }

      state.dragging = false;
      state.activeItem = null;
      state.activeCell = null;
    },
    setActiveCell: (state, action: PayloadAction<DragMoveAction>) => {
      state.activeCell = {row: action.payload.row, column: action.payload.column}
    },
    pinItem: (state, action: PayloadAction<DragPinItemAction>) => {
      const containeritems = state.items
      containeritems[action.payload.row][action.payload.column].pinned = !containeritems[action.payload.row][action.payload.column].pinned
      state.items = containeritems;
    }
  },
});

export const { setItems, setActiveItem, applyMovement, setActiveCell, pinItem } = dragSlice.actions;
export const dragReducer = dragSlice.reducer;