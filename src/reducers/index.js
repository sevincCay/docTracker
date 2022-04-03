import { combineReducers } from "redux";
import { auth } from "../features/loginLogoutSlice";
import { userList, singleUser } from "../features/userListSlice";
import { loggedInUser } from "../features/userSlice";
import { approveDocument, documentData } from "../features/documentSlice";

const combinedReducer = combineReducers({
  auth,
  userList,
  singleUser,
  loggedInUser,
  approveDocument,
  documentData,
});

export const rootReducer = (state, action) => {
  if (action.type === "users/logout") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};
