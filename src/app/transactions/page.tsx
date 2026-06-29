"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TransactionsPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    staff_id: '',
    service_amount: '',
    tip_amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    fetchStaff();
    fetchTransactions();
  }, []);

  async function fetchStaff() {
    const { data } = await supabase.from('staff').select('id, name').order('name');
    setStaff(data || []);
  }

  async function fetchTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        id, 
        created_at, 
        service_amount, 
        tip_amount, 
        processing_fee_on_tip, 
        net_tip_to_staff, 
        staff ( name )
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) console.error('Error fetching transactions:', error);
    else setTransactions(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('transactions')
        .insert([{
          salon_id: user?.id,
          staff_id: formData.staff_id,
          service_amount: parseFloat(formData.service_amount),
          tip_amount: parseFloat(formData.tip_amount),
        }]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Transaction logged! Staff balance updated.' });
      setFormData({ staff_id: '', service_amount: '', tip_amount: '' });
      fetchTransactions();
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Log Transaction</h1>
          <p className="text-slate-500">Enter the visit details to track tips and fees.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 sticky top-6">
              {message && (
                <div className={`p-3 rounded-lg text-xs font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message.text}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Staff Member</label>
                <select 
                  value={formData.staff_id}
                  onChange={(e) => setFormData({...formData, staff_id: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white text-sm"
                  required
                >
                  <option value="">Select employee...</option>
                  {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Amount ($)</label>
                <input 
                  type="number" step="0.01"
                  value={formData.service_amount}
                  onChange={(e) => setFormData({...formData, service_amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tip Amount ($)</label>
                <input 
                  type="number" step="0.01"
                  value={formData.tip_amount}
                  onChange={(e) => setFormData({...formData, tip_amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50 text-sm"
              >
                {loading ? 'Logging...' : 'Log Transaction'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-semibold text-slate-700">Recent Activity</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-3 font-medium">Staff</th>
                      <th className="px-6 py-3 font-medium text-right">Tip</th>
                      <th className="px-6 py-3 font-medium text-right text-red-500">Fee (3%)</th>
                      <th className="px-6 py-3 font-medium text-right text-teal-600">Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {transactions.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">No transactions yet.</td></tr>
                    ) : (
                      transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{tx.staff?.name || 'Unknown'}</td>
                          <td className="px-6 py-4 text-right font-mono">${tx.tip_amount.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right font-mono text-red-500">-${tx.processing_fee_on_tip.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right font-mono font-bold text-teal-600">${tx.net_tip_to_staff.toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
