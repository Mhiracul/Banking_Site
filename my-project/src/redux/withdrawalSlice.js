// Redux withdrawalSlice

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk action to fetch withdrawals from the server
export const fetchWithdrawals = createAsyncThunk(
  "withdrawal/fetchWithdrawals",
  async () => {
    const response = await fetch("http://localhost:4000/withdrawals"); // Update the URL to fetch the correct endpoint
    const data = await response.json();
    return data;
  }
);

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState: {
    withdrawals: [],
    loading: false,
    error: null,
  },
  reducers: {
    addWithdrawal: (state, action) => {
      state.withdrawals.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWithdrawals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWithdrawals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.withdrawals = action.payload;
      })
      .addCase(fetchWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.withdrawals = [];
      });
  },
});

export const { addWithdrawal } = withdrawalSlice.actions;

export default withdrawalSlice.reducer;
