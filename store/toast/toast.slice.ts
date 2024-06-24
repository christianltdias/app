import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastProps } from "../../shared/toast/toast";
import { uuidv4 } from "../../utils/id.utils";

interface ToastItem extends ToastProps {
  id: string;
}

export interface IToastState {
  items: Array<ToastItem>;
  itemsToRemove: string[];
  isWorking: boolean;
}

const initialState: IToastState = {
  items: [],
  itemsToRemove: [],
  isWorking: true,
}

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    createToast(state, action: PayloadAction<ToastProps>){
      const id = uuidv4()
      state.items.push({...action.payload, id: id });
    },
    removeToast(state, action: PayloadAction<string>){
      state.itemsToRemove.push(action.payload);

      if(!state.isWorking){
        state.isWorking = true;
      }
    },
    updateToast(state){
      if(state.isWorking){
        state.items = state.items.filter(item => !state.itemsToRemove.includes(item.id))
        state.isWorking = false
        state.itemsToRemove = []
      }
    }
  }
})

export const { createToast, removeToast, updateToast } = toastSlice.actions;
export const toasterReducer = toastSlice.reducer;