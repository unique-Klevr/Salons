"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type ClientTransaction = {
  tip_amount: number | string;
};

type Client = {
  id: string;
  name: string;
  phone: string | null;
  transactions?: ClientTransaction[] | null;
  total_tips: number;
};

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

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    try {
      // Complex query to get clients and their total tips
      // We use a join to sum up tips from the transactions table
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          transactions(tip_amount)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate total tips for each client in the frontend for simplicity
      const clientsWithTips = ((data as Omit<Client, 'total_tips'>[] | null) || []).map(client => {
        const totalTips = client.transactions?.reduce((acc, tx) => acc + Number(tx.tip_amount), 0) || 0;
        return { ...client, total_tips: totalTips };
      });

      // Sort by total tips (Whales first)
      clientsWithTips.sort((a, b) => b.total_tips - a.total_tips);
      
      setClients(clientsWithTips);
    } catch (e: unknown) {
      console.error('Error fetching clients:', e);
      setMessage({ type: 'error', text: getErrorMessage(e) });
    } finally {
      setLoading(false);
    }
  }

  async function addClient(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;

    setMessage(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('clients')
        .insert([{ 
          name, 
          phone, 
          salon_id: user?.id 
        }]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Client added successfully!' });
      setName('');
      setPhone('');
      fetchClients();
    } catch (e: unknown) {
      setMessage({ type: 'error', text: getErrorMessage(e) });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Client CRM</h1>
          <p className="text-slate-500">Track your clients and identify your biggest tippers.</p>
        </header>

        <form onSubmit={addClient} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 000-0000"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add Client
          </button>
        </form>

        {message && (
          <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-700">Client Leaderboard (Top Tippers)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Client</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium text-right">Total Tips Given</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr><td colSpan={3} className="px-6 py-10 text-center text-slate-400">Loading clients...</td></tr>
                ) : clients.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-10 text-center text-slate-400">No clients added yet.</td></tr>
                ) : (
                  clients.map((client, index) => (
                    <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {index === 0 && '👑 '} {client.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{client.phone || '—'}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-teal-600">
                        ${client.total_tips.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
