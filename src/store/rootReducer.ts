import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/auth.slice";
import userReducer from "../slices/user/user.slice";
import categoryReducer from "../slices/category/category.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
