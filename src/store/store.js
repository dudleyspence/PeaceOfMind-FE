import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "../slices/patientSlice";

export default configureStore({
  reducer: {
    patient: patientReducer,
  },
});
