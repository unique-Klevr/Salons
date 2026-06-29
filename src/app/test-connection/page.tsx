"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.from('profiles').select('*').limit(1);
        if (error) throw error;
        setStatus('success');
      } catch (e: any) {
        setErrorMsg(e.message);
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
        <p className="mt-6 text-xs text-gray-400">If you see an error, check your .env.local keys!</p>
      </div>
    </div>
  );
}
