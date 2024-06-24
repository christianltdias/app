import { configureStore } from '@reduxjs/toolkit'
import { dragReducer } from './drag/drag.slice'
import { calendarReducer } from './calendar/calendar.slice'
import { toasterReducer } from './toast/toast.slice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

let sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    drag: dragReducer,
    calendar: calendarReducer,
    toaster: toasterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector