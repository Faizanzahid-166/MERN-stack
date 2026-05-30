// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import { authAPI } from '../api/APIs.js';
import Avatar from '../components/ui/Avatar.jsx';
import BlogCard from '../components/blog/BlogCard.jsx';
import Button from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { PageLoader } from '../components/ui/Spinner.jsx';

// ── Tab ids ────────────────────────────────────────────────────
const TABS = ['Profile', 'Bookmarks', 'Security'];

export default function Profile() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');

  if (loading) return <PageLoader />;
  if (!user) return null;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Profile header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg"
        >
          <Avatar src={user.avatar} name={user.name} size="xl" />
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-2xl sm:text-3xl truncate">{user.name}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
            <span className={`inline-block mt-2 text-xs font-semibold px-3 py-0.5 rounded-full ${
              user.role === 'admin'
                ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            }`}>
              {user.role}
            </span>
          </div>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-2xl p-1 mb-8 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        {activeTab === 'Profile'   && <EditProfileTab user={user} />}
        {activeTab === 'Bookmarks' && <BookmarksTab />}
        {activeTab === 'Security'  && <SecurityTab />}
      </div>
    </div>
  );
}

// ── Edit Profile ───────────────────────────────────────────────
function EditProfileTab({ user }) {
  const { setUser } = useAuth(); // Assume setUser exists in your AuthContext
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: user.name, email: user.email },
  });

  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      let hasChanges = false;

      if (data.name !== user.name) {
        fd.append('name', data.name);
        hasChanges = true;
      }
      if (data.avatar?.[0]) {
        fd.append('avatar', data.avatar[0]);
        hasChanges = true;
      }

      if (!hasChanges) return toast.error('No changes detected');

      const res = await authAPI.updateProfile(fd);
      setUser(res.data.user || { ...user, name: data.name }); // Update global state
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="font-display font-semibold text-xl mb-6">Personal Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Full Name"
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          <Input label="Email" type="email" value={user.email} disabled hint="Email cannot be changed" />
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              Profile Photo
            </label>
            <input
              type="file" accept="image/*" {...register('avatar')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-brand-100 file:text-brand-600 file:font-medium hover:file:bg-brand-200"
            />
          </div>
          <Button type="submit" loading={isSubmitting} fullWidth>Save Changes</Button>
        </form>
      </div>

      {/* Account info card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="font-display font-semibold text-xl mb-6">Account Details</h2>
        <dl className="space-y-4">
          {[
            ['Role',   user.role],
            ['Member since', new Date(user.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })],
            ['User ID', user.id?.slice(0, 8) + '…'],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-sm py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <dt className="text-gray-500">{label}</dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">{val}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// ── Bookmarks ──────────────────────────────────────────────────
function BookmarksTab() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    authAPI.getBookmarks()
      .then(({ data }) => setBookmarks(data.bookmarks))
      .catch(() => toast.error('Could not load bookmarks'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="h-56 skeleton rounded-2xl" />
      ))}
    </div>
  );

  if (!bookmarks.length) return (
    <div className="text-center py-20 text-gray-400">
      <div className="text-5xl mb-4">🔖</div>
      <p className="font-medium text-gray-600 dark:text-gray-300">No bookmarks yet</p>
      <p className="text-sm mt-1">Save articles you want to read later.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
    </div>
  );
}

// ── Security ───────────────────────────────────────────────────
function SecurityTab() {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm();
  const newPass = watch('newPassword');

  const onSubmit = async (data) => {
    try {
      await authAPI.changePassword(data);
      toast.success('Password changed!');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="max-w-md">
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="font-display font-semibold text-xl mb-6">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Current Password" type="password" placeholder="••••••••"
            error={errors.currentPassword?.message}
            {...register('currentPassword', { required: 'Required' })}
          />
          <Input
            label="New Password" type="password" placeholder="Min. 6 characters"
            hint="At least 6 characters"
            error={errors.newPassword?.message}
            {...register('newPassword', { required: 'Required', minLength: { value: 6, message: 'Min 6 chars' } })}
          />
          <Input
            label="Confirm New Password" type="password" placeholder="Repeat new password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Required',
              validate: (v) => v === newPass || 'Passwords do not match',
            })}
          />
          <Button type="submit" loading={isSubmitting} fullWidth>Update Password</Button>
        </form>
      </div>
    </div>
  );
}
