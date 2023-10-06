import { AnyAction, Reducer } from "@reduxjs/toolkit";


type ReducerState = {
  selectDate: object | null;
  taskDate: object | null;
};

const initialState: ReducerState = {
  selectDate: null,
  taskDate: null,
};

const reducer: Reducer<ReducerState, AnyAction> = (
  state = initialState,
  action: AnyAction
) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_DATE":
      return { ...state, selectDate: payload };
      case "REMOVE_DATE":
        return { ...state, selectDate: null };
        case "SET_TASK_DATE":
      return { ...state, taskDate: payload };
      case "REMOVE_TASK_DATE":
      return { ...state, taskDate: null };
    default:
      return state;
  }
};

export default reducer;