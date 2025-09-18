import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, loadProfileThunk } from './authThunks';

const initialState = {
  token: localStorage.getItem('tms_token') || null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('tms_token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginThunk.fulfilled, (s, a) => { s.loading = false; s.token = a.payload.token; s.user = a.payload.user; })
      .addCase(loginThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })

      .addCase(loadProfileThunk.pending, (s) => { s.loading = true; })
      .addCase(loadProfileThunk.fulfilled, (s, a) => { s.loading = false; s.token = a.payload.token; s.user = a.payload.user; })
      .addCase(loadProfileThunk.rejected, (s, a) => { s.loading = false; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;