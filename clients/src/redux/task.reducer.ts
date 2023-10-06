import { AnyAction, Reducer } from "@reduxjs/toolkit";


type ReducerState = {
  taskBool: boolean;
  task: object | null;
  updateTask:null|object;
  imgTask:null|string
};

const initialState: ReducerState = {
  taskBool: false,
  task: null,
  updateTask:null,
  imgTask:null,
};

const reducer: Reducer<ReducerState, AnyAction> = (
  state = initialState,
  action: AnyAction
) => {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_BOOL":
      return { ...state, taskBool: payload };
    case "SET_TASK":
      return { ...state, task: payload };
      case "UPDATE_TASK":
      return { ...state, updateTask: payload };
      case "REMOVE_UPDATE_TASK":
      return { ...state, updateTask: null };
      case "UPDATE_IMG":
      return { ...state, imgTask: payload };
      case "REMOVE_UPDATE_IMG":
      return { ...state, imgTask: null };
    default:
      return state;
  }
};

export default reducer;
