import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfileThunk } from './features/auth/authThunks';
import Topbar from './components/Topbar';
import LoginPanel from './components/LoginPanel';
import UsersView from './components/UsersView';
import TasksView from './components/TasksView';

export default function App() {
  const dispatch = useDispatch();
  const auth = useSelector(s => s.auth);

  useEffect(() => {
    dispatch(loadProfileThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <main className="max-w-5xl mx-auto p-4">
        {!auth.user ? <LoginPanel /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 bg-white rounded shadow p-3">
              <UsersView />
            </div>
            <div className="md:col-span-2 bg-white rounded shadow p-3">
              <TasksView />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}