import { configureStore } from '@reduxjs/toolkit'
import { dragReducer } from './slices/components/drag/drag.slice'

export const makeStore = () => {
  return configureStore({
    reducer: { drag: dragReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']