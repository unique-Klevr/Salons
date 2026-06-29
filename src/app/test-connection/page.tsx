"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return 'An unknown error occurred.';
}

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function checkConnection() {
      try {
        const checks = await Promise.all([
          supabase.from('staff').select('id').limit(1),
          supabase.from('transactions').select('id').limit(1),
        ]);

        const failedCheck = checks.find((check) => check.error);
        if (failedCheck?.error) throw failedCheck.error;

        setStatus('success');
      } catch (e: unknown) {
        setErrorMsg(getErrorMessage(e));
        setStatus('error');
      }
    }
    checkConnection();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="p-8 bg-white rounded-2xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        {status === 'loading' && <p className="text-gray-500 animate-pulse">Testing connection to Supabase...</p>}
        {status === 'success' && (
          <div className="text-green-600 font-medium">
            ✅ Connection Successful! Your app is talking to the database.
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-600 font-medium">
            ❌ Connection Failed: <br />
            <span className="text-sm font-normal text-gray-600">{errorMsg}</span>
          </div>
        )}
        <p className="mt-6 text-xs text-gray-400">If you see an error, check your .env.local keys and run supabase/schema.sql.</p>
      </div>
    </div>
  );
}
