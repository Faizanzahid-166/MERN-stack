// src/pages/ResetPassword.jsx
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authAPI } from '../api/APIs.js';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ newPassword }) => {
    try {
      await authAPI.resetPassword({ token, newPassword });
      toast.success('Password reset! Please login.');
      navigate('/login');
    } catch {
      toast.error('Invalid or expired token.');
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-xl">
          <h1 className="font-display font-bold text-3xl mb-2">Reset password</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your new password below.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input
              type="password"
              {...register('newPassword', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              placeholder="New password"
            />
            {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-brand w-full !py-3">
              {isSubmitting ? 'Saving...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
