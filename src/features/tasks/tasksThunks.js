import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetch',
  async ({ page = 1, pageSize = 5 } = {}, { rejectWithValue }) => {
    try {
      return await Api.listTasks({ page, pageSize });
    } catch (err) {
      return rejectWithValue(err.message || 'Could not fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/create',
  async ({ title, description, assigneeId }, { rejectWithValue }) => {
    try {
      return await Api.createTask({ title, description, assigneeId });
    } catch (err) {
      return rejectWithValue(err.message || 'Could not create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, patch }, { rejectWithValue }) => {
    try {
      return await Api.updateTask(id, patch);
    } catch (err) {
      return rejectWithValue(err.message || 'Could not update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id, { rejectWithValue }) => {
    try {
      await Api.deleteTask(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || 'Could not delete task');
    }
  }
);
