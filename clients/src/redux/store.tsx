import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import dateReducer from "./date.reducer";
import taskReducer from "./task.reducer";
const store = configureStore({
  reducer: {
    dateReducer: dateReducer,
    taskReducer:taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
