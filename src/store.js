import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import usersReducer from './features/users/usersSlice';
import tasksReducer from './features/tasks/tasksSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    tasks: tasksReducer,
  },
});