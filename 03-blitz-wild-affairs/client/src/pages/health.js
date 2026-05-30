// src/pages/health.js
// ↳ Route: /health
// Was: src/pages/Health.jsx — lowercased. Fixed display (was rendering {connected} boolean).
import { useEffect, useState } from 'react';
import { checkHealth } from '@/api/APIs';

export default function Health() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    checkHealth()
      .then((res) => {
        if (res.success) {
          console.log('⚡ Backend Connected!');
          setStatus('ok');
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        console.log('❌ Backend not connected');
        setStatus('error');
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      {status === 'checking' && <p className="text-gray-500">Checking backend connection…</p>}
      {status === 'ok'       && <p className="text-green-600 font-semibold text-lg">✅ Backend connected</p>}
      {status === 'error'    && <p className="text-red-500 font-semibold text-lg">❌ Backend not reachable</p>}
    </div>
  );
}
