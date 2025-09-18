import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { loginThunk } from "../features/auth/authThunks";

export default function LoginPanel() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.auth.loading);
  const error = useSelector((s) => s.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginThunk(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#C00057] mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#E91E63] focus:outline-none transition"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#E91E63] focus:outline-none transition"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r from-[#C00057] to-[#E91E63] text-white font-semibold shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? "Signing in..." : "Sign in"}
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-600 text-center"
            >
              {error}
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
