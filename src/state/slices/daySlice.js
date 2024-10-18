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
      console.log(tasks);
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
    updateTaskCompletion: (state, action) => {
      const { taskId, isCompleted } = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);
      if (task) {
        task.isCompleted = isCompleted;
        state.progress = calculateProgress(state.tasks);
        state.sortedTasks = sortTasksByCategory(state.tasks);
      }
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

export const { resetDay, setChosenDay, updateTaskCompletion } =
  daySlice.actions;

export const selectDay = (state) => state.day.currentDay;
export const selectDayTasks = (state) => state.day.tasks;
export const selectDayTasksLoading = (state) => state.day.isLoading;
export const selectDayTasksError = (state) => state.day.error;
export const selectDayProgress = (state) => state.day.progress;
export const selectSortedDayTasks = (state) => state.day.sortedTasks;
export const selectChosenDay = (state) => state.day.chosenDate;

export default daySlice.reducer;
