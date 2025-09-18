import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api/api';
import { decodeToken } from '../../utils/decodeToken';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await Api.login(email, password);
      localStorage.setItem('tms_token', token);
      const user = decodeToken(token);
      return { token, user };
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);


export const loadProfileThunk = createAsyncThunk(
  'auth/loadProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('tms_token');
      if (!token) return rejectWithValue('No token present');
      const user = await Api.getProfile(token);
      return { token, user };
    } catch (err) {
      return rejectWithValue(err.message || 'Could not load profile');
    }
  }
);