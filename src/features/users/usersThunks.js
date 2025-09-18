import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api/api';

export const fetchUsers = createAsyncThunk('users/fetch', async (_, { rejectWithValue }) => {
  try {
    const users = await Api.listUsers();
    return users;
  } catch (err) {
    return rejectWithValue(err.message || 'Could not fetch users');
  }
});

export const createUser = createAsyncThunk('users/create', async ({ name, email, role }, { rejectWithValue }) => {
  try {
    const user = await Api.createUser({ name, email, role });
    return user;
  } catch (err) {
    return rejectWithValue(err.message || 'Could not create user');
  }
});