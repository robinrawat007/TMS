import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks } from './tasksThunks';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    total: 0,
    page: 1,
    pageSize: 5,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.meta.arg.page; 
        state.status = 'succeeded';
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default tasksSlice.reducer;
