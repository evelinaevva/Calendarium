import { AnyAction, Reducer } from "@reduxjs/toolkit";

type  userType= {
  authUser:authUser|null
};

type authUser = {
    userId: number ;
    userName: string ;
    userEmail: string ;
    userSettings: object ;
  };

const initialState: userType = {
    authUser: null ,
  };

  
const reducer: Reducer<userType, AnyAction> = (
    state = initialState,
    action: AnyAction
  ) => {
    const { type, payload } = action;
  
    switch (type) {
      case "SET_USER":
        return { ...state, authUser: payload };
      case "DEL_USER":
        return { ...state, authUser: null };
      default:
        return state;
    }
  };

  export default reducer;