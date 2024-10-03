import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksForSpecificDay } from "../../axios/task.axios";

const calculateProgress = (tasks) => {
  const totalTasks = tasks.length;

  const completed = tasks.filter((task) => task.isCompleted).length;
  const completePercentage =
    (completed / totalTasks) * 100 ? (completed / totalTasks) * 100 : 0;

  return completePercentage;
};

const sortTasksByCategory = (tasks) => {
  const sortedTasks = {
    Meals: [],
    Hygiene: [],
    Medical: [],
    Exercise: [],
    Additional: [],
    "Day Specific": [],
  };

  tasks.forEach((task) => {
    if (task.template.category) {
      sortedTasks[task.template.category].push(task);
    } else {
      sortedTasks["Day Specific"].push(task);
    }
  });

  return sortedTasks;
};

export const fetchDayTasks = createAsyncThunk(
  "day/fetchDayTasks",
  async ({ patient_id, date }, { rejectWithValue }) => {
    try {
      const tasks = await getTasksForSpecificDay(patient_id, date);
      tasks.forEach((task) => {
        if (!task.template.category) {
          task.template.category = "Day Specific";
          const date = new Date(task.scheduleDate);
          task.time = date.toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
        }
      });
      return tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          error.message ||
          "Failed to fetch tasks for this day."
      );
    }
  }
);

const daySlice = createSlice({
  name: "day",
  initialState: {
    currentDay: new Date(),
    isLoading: false,
    error: null,
    tasks: [],
    sortedTasks: {
      Meals: [],
      Hygiene: [],
      Medical: [],
      Exercise: [],
      Additional: [],
      "Day Specific": [],
    },
    progress: 0,
  },
  reducers: {
    setCurrentDay(state, action) {
      state.currentDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDayTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDayTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.sortedTasks = sortTasksByCategory(action.payload);
        state.progress = calculateProgress(action.payload);
      })
      .addCase(fetchDayTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { setCurrentDay, resetDay } = daySlice.actions;

export const selectDay = (state) => state.day.currentDay;
export const selectDayTasks = (state) => state.day.tasks;
export const selectDayTasksLoading = (state) => state.day.isLoading;
export const selectDayTasksError = (state) => state.day.error;
export const selectDayProgress = (state) => state.day.progress;
export const selectSortedDayTasks = (state) => state.day.sortedTasks;

export default daySlice.reducer;
