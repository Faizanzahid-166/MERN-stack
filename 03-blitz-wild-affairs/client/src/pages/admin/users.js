// src/pages/admin/users.js
// ↳ Route: /admin/users
// Was: src/pages/admin/Users.jsx — lowercased.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { adminAPI } from '@/api/APIs';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { timeAgo } from '@/utils/helpers';
import { PageLoader } from '@/components/ui/Spinner';

export default function Users() {
  const { user: me, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [confirm, setConfirm] = useState({ open: false, userId: null, action: null, label: '' });
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!authLoading && (!me || !isAdmin)) router.replace('/');
  }, [authLoading, me, isAdmin, router]);

  useEffect(() => {
    adminAPI.getUsers()
      .then(({ data }) => setUsers(data.users))
      .catch(() => toast.error('Could not load users'))
      .finally(() => setLoading(false));
  }, []);

  const openConfirm  = (userId, action, label) => setConfirm({ open: true, userId, action, label });
  const closeConfirm = () => setConfirm({ open: false, userId: null, action: null, label: '' });

  const handleConfirm = async () => {
    setWorking(true);
    const { userId, action } = confirm;
    try {
      if (action === 'delete') {
        await adminAPI.deleteUser(userId);
        setUsers((p) => p.filter((u) => u.id !== userId));
        toast.success('User deleted');
      } else {
        const { data } = await adminAPI.updateUser(userId, { role: action });
        setUsers((p) => p.map((u) => (u.id === userId ? { ...u, role: data.user.role } : u)));
        toast.success('Role updated');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setWorking(false);
      closeConfirm();
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading) return <PageLoader />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl">Users</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {users.length} registered user{users.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="relative max-w-sm mb-6">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-left bg-gray-50 dark:bg-gray-800/50">
                {['User', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-3.5 font-semibold text-xs text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>{Array(5).fill(0).map((_, j) => (
                    <td key={j} className="px-6 py-4"><div className="h-4 skeleton rounded" /></td>
                  ))}</tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                    <p className="text-3xl mb-2">👥</p>No users found
                  </td>
                </tr>
              ) : filtered.map((user, i) => (
                <motion.tr key={user.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={user.avatar} name={user.name} size="sm" />
                      <span className="font-medium truncate max-w-[140px]">{user.name}</span>
                      {user.id === me?.id && (
                        <span className="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-600 px-1.5 py-0.5 rounded-full">You</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 truncate max-w-[180px]">{user.email}</td>
                  <td className="px-6 py-4"><Badge color={user.role === 'admin' ? 'brand' : 'gray'}>{user.role}</Badge></td>
                  <td className="px-6 py-4 text-gray-400">{timeAgo(user.created_at)}</td>
                  <td className="px-6 py-4">
                    {user.id !== me?.id ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openConfirm(user.id, user.role === 'admin' ? 'user' : 'admin', user.role === 'admin' ? 'Demote to User' : 'Make Admin')}
                          className="text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline"
                        >
                          {user.role === 'admin' ? 'Demote' : 'Make Admin'}
                        </button>
                        <span className="text-gray-300 dark:text-gray-700">|</span>
                        <button onClick={() => openConfirm(user.id, 'delete', 'Delete User')} className="text-xs font-medium text-red-400 hover:text-red-600 hover:underline">
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={confirm.open}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        loading={working}
        title={confirm.action === 'delete' ? 'Delete User?' : 'Change Role?'}
        message={
          confirm.action === 'delete'
            ? 'This will permanently delete the user and all their data. This cannot be undone.'
            : `Change this user's role to "${confirm.action}"?`
        }
        confirmLabel={confirm.label}
        confirmVariant={confirm.action === 'delete' ? 'danger' : 'brand'}
      />
    </div>
  );
}
