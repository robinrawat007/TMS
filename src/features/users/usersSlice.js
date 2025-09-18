import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, createUser } from './usersThunks';

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (s, a) => { s.items = a.payload; s.status = 'succeeded'; })
      .addCase(fetchUsers.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload || a.error.message; })

      .addCase(createUser.fulfilled, (s, a) => { s.items.push(a.payload); });
  }
});

export default usersSlice.reducer;