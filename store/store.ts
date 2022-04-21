import { configureStore } from "@reduxjs/toolkit";

// Reducer
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
