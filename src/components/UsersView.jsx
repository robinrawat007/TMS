import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser } from "../features/users/usersThunks";
import { motion, AnimatePresence } from "framer-motion";

export default function UsersView() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.items);
  const user = useSelector((s) => s.auth.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onCreate = async (e) => {
    e.preventDefault();
    if (user?.role !== "admin") return;
    await dispatch(createUser({ name, email, role }));
    setName("");
    setEmail("");
    setRole("user");
  };

  const isAdmin = user?.role === "admin";

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h3 className="text-xl font-bold text-[#C00057] mb-3">Users</h3>

      {isAdmin && (
        <motion.form
          onSubmit={onCreate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-md rounded-lg p-4 flex flex-wrap gap-3 items-end mb-6"
        >
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="flex-1 min-w-[120px] px-2 py-1 border border-gray-200 rounded-md bg-gray-50 
            focus:bg-white focus:border-[#C00057] focus:ring-1 focus:ring-[#C00057] 
            outline-none text-sm transition-all"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="flex-1 min-w-[160px] px-2 py-1 border border-gray-200 rounded-md bg-gray-50 
            focus:bg-white focus:border-[#C00057] focus:ring-1 focus:ring-[#C00057] 
            outline-none text-sm transition-all"
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="px-2 py-1 w-28 border border-gray-200 rounded-md bg-gray-50 text-sm 
              flex justify-between items-center 
              hover:border-[#C00057] focus:border-[#C00057] focus:ring-1 focus:ring-[#C00057]"
            >
              {role === "user" ? "👤 User" : "⭐ Admin"}
              <span className="ml-1 text-xs">▼</span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -5, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -5, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute z-10 mt-1 w-28 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden text-sm"
                >
                  <li
                    onClick={() => {
                      setRole("user");
                      setOpen(false);
                    }}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    👤 User
                  </li>
                  <li
                    onClick={() => {
                      setRole("admin");
                      setOpen(false);
                    }}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    ⭐ Admin
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1 bg-[#C00057] hover:bg-[#E91E63] text-white rounded-md text-sm font-medium shadow-sm"
          >
            Add
          </motion.button>
        </motion.form>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow-md divide-y"
      >
        {users.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex justify-between items-center p-3 hover:bg-gray-50 transition"
          >
            <div>
              <div className="font-medium text-[#15317E]">{u.name}</div>
              <div className="text-xs text-gray-500 flex gap-2">
                <span>{u.email}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">{u.role}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
