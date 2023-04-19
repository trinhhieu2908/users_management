import { combineReducers } from "@reduxjs/toolkit";
import { reducer as modalReducer } from "../redux/modal/slice";
import { reducer as usersReducer } from "../redux/users/slice";

const createReducer = (injectedReducers = {}) => {
  const appReducer = combineReducers({
    modal: modalReducer,
    users: usersReducer,
    ...injectedReducers,
  });

  return appReducer;
};

export default createReducer;
