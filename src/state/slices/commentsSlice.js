import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPatientComments,
  postComment as addPatientComment,
} from "../../axios/comments.axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (patient_id, { rejectWithValue }) => {
    try {
      const response = await getPatientComments(patient_id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch comments."
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ patient_id, text, author, authorType }, { rejectWithValue }) => {
    try {
      const response = await addPatientComment(
        text,
        patient_id,
        author,
        authorType
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to add comment."
      );
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { resetComments } = commentsSlice.actions;

export const selectComments = (state) => state.comments.comments;
export const selectCommentsLoading = (state) => state.comments.isLoading;
export const selectCommentsError = (state) => state.comments.error;

export default commentsSlice.reducer;
