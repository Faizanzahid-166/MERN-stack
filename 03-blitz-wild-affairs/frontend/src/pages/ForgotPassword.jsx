// src/pages/ForgotPassword.jsx
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authAPI } from '../api/APIs.js';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      await authAPI.forgotPassword(email);
      toast.success('Reset link sent — check your email!');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-xl">
          <h1 className="font-display font-bold text-3xl mb-2">Forgot password?</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your email and we'll send you a reset link.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input
              type="email"
              {...register('email', { required: 'Email required' })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-brand w-full !py-3">
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            <Link to="/login" className="text-brand-600 hover:underline">← Back to login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
