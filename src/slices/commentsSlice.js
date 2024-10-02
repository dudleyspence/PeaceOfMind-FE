import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPatientComments, addPatientComment } from "../axios/comments.axios";

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
