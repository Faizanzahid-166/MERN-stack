// src/pages/_app.js
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';

/**
 * Pages that use AdminLayout instead of the public MainLayout.
 * We match by pathname prefix so all /admin/* routes get the sidebar.
 */
function getLayout(router, page) {
  if (router.pathname.startsWith('/admin')) {
    return <AdminLayout>{page}</AdminLayout>;
  }
  return <MainLayout>{page}</MainLayout>;
}

export default function App({ Component, pageProps, router }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          {getLayout(router, <Component {...pageProps} />)}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '12px',
                background: 'var(--toast-bg, #fff)',
                color: 'var(--toast-color, #111)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              },
            }}
          />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
