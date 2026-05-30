// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

// Layouts
import MainLayout  from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// Public pages
import Home           from './pages/Home.jsx';
import Blogs          from './pages/Blogs.jsx';
import BlogDetail     from './pages/BlogDetail.jsx';
import Login          from './pages/Login.jsx';
import Register       from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword  from './pages/ResetPassword.jsx';
import NotFound       from './pages/NotFound.jsx';
import Profile        from './pages/Profile.jsx';
import ResetPasswordToken from './pages/ResetPasswordToken.jsx';

// Admin pages
import Dashboard from './pages/admin/Dashboard.jsx';
import BlogList  from './pages/admin/BlogList.jsx';
import BlogEditor from './pages/admin/BlogEditor.jsx';
import Users     from './pages/admin/Users.jsx';

import { Spinner } from './components/ui/Spinner.jsx';
import Health from './pages/Health.jsx'

// ── Route Guards ───────────────────────────────────────────────
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
    <Spinner size="lg" />
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user)    return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return user ? <Navigate to="/" replace /> : children;
};

// ── App ────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* ── Public / User Routes ── */}
      <Route element={<MainLayout />}>
        <Route    path="Health"                 element={<Health />} />
        <Route path="/"               element={<Home />} />
        <Route path="/blogs"          element={<Blogs />} />
        <Route path="/blogs/:slug"    element={<BlogDetail />} />
        <Route path="/login"          element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register"       element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password"  element={<ResetPassword />} />
        <Route path="/reset-password-token" element={<ResetPasswordToken />}/>
        <Route path="/profile"        element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Route>

      {/* ── Admin Routes ── */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index               element={<Dashboard />} />
        <Route path="blogs"        element={<BlogList />} />
        <Route path="blogs/new"    element={<BlogEditor />} />
        <Route path="blogs/edit/:id" element={<BlogEditor />} />
        <Route path="users"        element={<Users />} />
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
