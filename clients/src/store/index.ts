import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dateReducer from "../redux/date.reducer";
import taskReducer from "../redux/task.reducer";
import taskSlice from "./slices/taskSlice"
import styleReducer from "../redux/style.reducer"
export const store = configureStore({
  reducer: {
    auth: userReducer,
    dateReducer: dateReducer,
    taskReducer:taskReducer,
    taskSlice:taskSlice,
    styleReducer:styleReducer
  },
});
