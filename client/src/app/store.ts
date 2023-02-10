import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import arrangementsReducer from "../features/arrangements/arrangementsSlice"
import flowersReducer from "../features/flowers/flowersSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    arrangements: arrangementsReducer,
    flowers: flowersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
