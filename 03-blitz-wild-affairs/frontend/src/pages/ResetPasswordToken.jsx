// src/pages/ResetPasswordToken.jsx

import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authAPI } from '../api/APIs.js';

export default function ResetPasswordToken() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  // const token = new URLSearchParams(window.location.search).get('token');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ password }) => {
    try {
      // send an object matching the backend: { token, newPassword }
      const res = await authAPI.resetPassword({ token, newPassword: password });

      toast.success(res?.data?.message || 'Password reset successful!');

      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-3xl p-8 shadow-xl">
          <h1 className="font-display font-bold text-3xl mb-2">
            Reset Password
          </h1>

          <p className="text-gray-500 text-sm mb-8">
            Enter your new password below.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <input
                type="password"
                placeholder="New password"
                {...register('password', {
                  required: 'Password required',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters',
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-brand w-full !py-3"
            >
              {isSubmitting
                ? 'Resetting...'
                : 'Reset Password'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            <Link
              to="/login"
              className="text-brand-600 hover:underline"
            >
              ← Back to login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}