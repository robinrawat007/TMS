import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from '../features/auth/authSlice';

export default function Topbar() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full bg-white shadow-md border-b"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="text-2xl font-extrabold tracking-wide text-[#C00057]">
            TMS
          </div>
          <div className="text-sm text-gray-600 hidden sm:block">
            Task Management System
          </div>
        </motion.div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-sm text-[#15317E] font-medium">
                {user.name}{' '}
                <span className="italic text-gray-500">({user.role})</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(logout())}
                className="px-4 py-1.5 rounded-lg bg-[#C00057] hover:bg-[#E91E63] text-white font-medium shadow-sm transition-all"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <div className="text-sm text-gray-500 italic">Not signed in</div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
