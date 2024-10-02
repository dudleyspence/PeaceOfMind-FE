import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPatientByPatientId } from "../axios/patient.axios";

export const fetchPatient = createAsyncThunk(
  "patient/fetchPatient",
  async (patient_id, { rejectWithValue }) => {
    try {
      const response = await getPatientByPatientId(patient_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patient: null,
    carer: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.patient = action.payload;
        state.carer = action.payload.carers[0];
        state.isLoading = false;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.error = action.payload || "An error occurred";
        state.isLoading = false;
      });
  },
});

export default patientSlice.reducer;
