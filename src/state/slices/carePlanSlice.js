import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTaskTemplatesByPatientId } from "../../axios/task.axios";

export const fetchRoutineTasks = createAsyncThunk(
  "carePlan/fetchRoutineTasks",
  async (patient_id, { rejectWithValue }) => {
    try {
      console.log(patient_id, "fetchRoutine");
      const response = await getTaskTemplatesByPatientId(patient_id);

      const routineTasks = {
        Meals: [],
        Hygiene: [],
        Medical: [],
        Exercise: [],
        Additional: [],
      };

      response.forEach((task) => {
        if (task.category) {
          routineTasks[task.category].push(task);
        }
      });
      return routineTasks;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchScheduledTasks = createAsyncThunk(
  "carePlan/fetchScheduledTasks",
  async (patient_id, { rejectWithValue }) => {
    try {
      const response = await getScheduledTasks(patient_id);
      response.forEach((task) => {
        const date = new Date(task.scheduleDate);
        task.date = date.toLocaleDateString("en-GB", "PPP");
        task.time = date.toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const carePlanSlice = createSlice({
  name: "carePlan",
  initialState: {
    routineTasks: {
      Meals: [],
      Hygiene: [],
      Medical: [],
      Exercise: [],
      Additional: [],
    },
    scheduledTasks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutineTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoutineTasks.fulfilled, (state, action) => {
        state.routineTasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRoutineTasks.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchScheduledTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchScheduledTasks.fulfilled, (state, action) => {
        state.scheduledTasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchScheduledTasks.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const selectRoutineTasks = (state) => state.carePlan.routineTasks;

export const selectScheduledTasks = (state) => state.carePlan.scheduledTasks;

export const selectCarePlanLoading = (state) => state.carePlan.isLoading;

export const selectCarePlanError = (state) => state.carePlan.error;

export const { resetCarePlan } = carePlanSlice.actions;

export default carePlanSlice.reducer;
