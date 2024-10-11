import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./slices/patientSlice";
import commentsReducer from "./slices/commentsSlice";
import dayReducer from "./slices/daySlice";

import carePlanReducer from "./slices/carePlanSlice";

export default configureStore({
  reducer: {
    patient: patientReducer,
    comments: commentsReducer,
    day: dayReducer,
    carePlan: carePlanReducer,
  },
});
