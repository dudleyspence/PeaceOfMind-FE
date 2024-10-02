import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./slices/patientSlice";
import commentsReducer from "./slices/commentsSlice";

export default configureStore({
  reducer: {
    patient: patientReducer,
    comments: commentsReducer,
  },
});
