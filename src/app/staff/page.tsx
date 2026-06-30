"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type StaffMember = {
  id: string;
  name: string;
  email: string | null;
  current_tip_balance: number;
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

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [payoutLoading, setPayoutLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    setLoading(true);
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) console.error('Error fetching staff:', error);
    else setStaff((data as StaffMember[] | null) || []);
    setLoading(false);
  }

  async function addStaff(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;

    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('staff')
      .insert([{ 
        name, 
        email, 
        salon_id: user?.id 
      }]);

    if (error) {
      alert('Error adding staff: ' + error.message);
    } else {
      setName('');
      setEmail('');
      fetchStaff();
    }
  }

  async function handlePayout(staffId: string, amount: number) {
    if (amount <= 0) return;
    
    setPayoutLoading(staffId);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // 1. Record the payout in the payouts table
      const { error: payoutError } = await supabase
        .from('payouts')
        .insert([{
          salon_id: user?.id,
          staff_id: staffId,
          amount_paid: amount,
        }]);

      if (payoutError) throw payoutError;

      // 2. Reset the staff member's balance to 0
      const { error: updateError } = await supabase
        .from('staff')
        .update({ current_tip_balance: 0 })
        .eq('id', staffId);

      if (updateError) throw updateError;

      alert('Payout successful! Balance reset to $0.00');
      fetchStaff();
    } catch (e: unknown) {
      alert('Payout failed: ' + getErrorMessage(e));
    } finally {
      setPayoutLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-500">Manage your team and track their tip balances.</p>
        </header>

        <form onSubmit={addStaff} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-1">Employee Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-1">Email (Optional)</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@email.com"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add Employee
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Tip Balance</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">Loading staff...</td></tr>
              ) : staff.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">No staff added yet.</td></tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{member.name}</td>
                    <td className="px-6 py-4 text-slate-500">{member.email || '—'}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-teal-600">
                      ${member.current_tip_balance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handlePayout(member.id, member.current_tip_balance)}
                        disabled={member.current_tip_balance <= 0 || payoutLoading === member.id}
                        className="text-xs bg-slate-100 hover:bg-teal-100 text-slate-600 hover:text-teal-700 px-3 py-1 rounded-full border border-slate-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {payoutLoading === member.id ? '...' : 'Mark as Paid'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
