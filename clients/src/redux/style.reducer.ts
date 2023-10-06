import { AnyAction, Reducer } from "@reduxjs/toolkit";
type hourForHoursBar={
    hours:null|number;
    minute:null|number
}

type ReducerState = {
  hourForHoursBar: hourForHoursBar;
  taskDate: object | null;
  userPage:boolean;
};

const initialState: ReducerState = {
  hourForHoursBar:{
    hours:null,
    minute:null
  },
  taskDate: null,
  userPage:false
};

const reducer: Reducer<ReducerState, AnyAction> = (
  state = initialState,
  action: AnyAction
) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_HOURBAR":
      return { ...state, hourForHoursBar: payload };
      case "REMOVE_HOURBAR":
        return { ...state, hourForHoursBar:{
            hours:null,
            minute:null
          } };
      case "SHOW_USER_PAGE":
      return { ...state, userPage: true };
      case "CLOSE_USER_PAGE":
        return { ...state, userPage:false };
        case "SHOW/CLOSE_USER_PAGE":
        return { ...state, userPage:!state.userPage};
    default:
      return state;
  }
};

export default reducer;