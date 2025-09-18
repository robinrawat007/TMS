import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../features/tasks/tasksThunks";
import { fetchUsers } from "../features/users/usersThunks";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Check, Clock } from "lucide-react";

export default function TasksView() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const tasksState = useSelector((s) => s.tasks);
  const users = useSelector((s) => s.users.items);
  const { items: tasks, total, page, pageSize, status } = tasksState;

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [assignTo, setAssignTo] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  const create = async (e) => {
    e.preventDefault();
    if (user?.role !== "admin") return;

    await dispatch(
      createTask({
        title: newTitle,
        description: newDesc,
        assigneeId: assignTo || null,
      })
    );

    await dispatch(fetchTasks({ page, pageSize }));
    setNewTitle("");
    setNewDesc("");
    setAssignTo("");
  };

  const onUpdate = async (id, patch) => {
    await dispatch(updateTask({ id, patch }));
    await dispatch(fetchTasks({ page, pageSize }));
  };

  const onDelete = async (id) => {
    await dispatch(deleteTask(id));
    await dispatch(fetchTasks({ page, pageSize }));
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold text-[#C00057] mb-4">Tasks</h3>

      {user?.role === "admin" && (
        <motion.form
          onSubmit={create}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-3 mb-6"
        >
          <input
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            className="px-3 py-2 border rounded-md shadow-sm text-sm bg-gray-50 focus:bg-white 
            focus:ring-2 focus:ring-[#C00057] outline-none transition"
          />
          <input
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description"
            className="px-3 py-2 border rounded-md shadow-sm text-sm bg-gray-50 focus:bg-white 
            focus:ring-2 focus:ring-[#C00057] outline-none transition"
          />
          <motion.select
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-3 py-2 border rounded-md shadow-sm text-sm bg-gray-50 focus:bg-white 
            focus:ring-2 focus:ring-[#C00057] outline-none transition"
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </motion.select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-[#C00057] hover:bg-[#E91E63] text-white rounded-md font-medium shadow-md transition-all"
          >
            Create
          </motion.button>
        </motion.form>
      )}
<motion.div
  initial={false}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="bg-white rounded-lg shadow-md divide-y"
>
  {status === "loading" && (
    <div className="p-4 text-center text-gray-500">Loading...</div>
  )}

  <div className="hidden md:flex p-4 font-semibold text-gray-700 border-b bg-gray-50">
    <div className="flex-1">Title</div>
    <div className="w-20 text-center">Status</div>
    <div className="w-32 text-center">Assignee</div>
  </div>

  <AnimatePresence initial={false}>
    {tasks.map((t) => {
      const canEdit = user && (user.role === "admin" || user.id === t.assigneeId);
      return (
        <motion.div
          key={t.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-gray-50 transition"
        >
          <div className="flex-1">
            <div className="font-semibold text-[#15317E] flex items-center gap-2">
              {t.title}
              {t.status === "done" ? (
                <Check className="text-green-500" size={18} />
              ) : (
                <Clock className="text-yellow-500 animate-pulse" size={18} />
              )}
            </div>
            <div className="text-sm text-gray-600">{t.description}</div>
          </div>

          <div className="w-20 text-center">
            <input
              type="checkbox"
              checked={t.status === "done"}
              onChange={() =>
                canEdit &&
                onUpdate(t.id, { status: t.status === "open" ? "done" : "open" })
              }
              disabled={!canEdit || !t.assigneeId}
              className="w-5 h-5 accent-[#C00057] cursor-pointer mx-auto"
              title={
                !t.assigneeId
                  ? "Cannot mark unassigned task"
                  : t.status === "done"
                  ? "Done"
                  : "Pending"
              }
            />
          </div>

          <div className="w-32 text-center">
            <motion.select
              value={t.assigneeId || ""}
              onChange={(e) =>
                canEdit && onUpdate(t.id, { assigneeId: e.target.value || null })
              }
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={canEdit ? { scale: 1.03 } : {}}
              whileTap={canEdit ? { scale: 0.97 } : {}}
              disabled={user.role !== "admin"}
              className={`px-2 py-1 border rounded-md text-sm shadow-sm focus:ring-1 focus:ring-[#C00057] transition mx-auto ${
                user.role !== "admin"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : ""
              }`}
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </motion.select>
          </div>
        </motion.div>
      );
    })}
  </AnimatePresence>
</motion.div>


      <div className="flex gap-2 items-center justify-center mt-4">
        <button
          disabled={page <= 1}
          onClick={() => dispatch(fetchTasks({ page: page - 1, pageSize }))}
          className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 disabled:opacity-50 transition"
        >
          Prev
        </button>
        <div className="text-sm font-medium">
          Page {page} / {totalPages}
        </div>
        <button
          disabled={page >= totalPages}
          onClick={() => dispatch(fetchTasks({ page: page + 1, pageSize }))}
          className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
