import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import flowersReducer from "../features/flowers/flowersSlice";
import arrangementsReducer from "../features/arrangements/arrangementsSlice";
import arrangementDetailsReducer from "../features/arrangements/arrangementDetailsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    arrangements: arrangementsReducer,
    flowers: flowersReducer,
    arrangementDetails: arrangementDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
