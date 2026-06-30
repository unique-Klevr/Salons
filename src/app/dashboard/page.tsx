"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type DashboardTransaction = {
  service_amount: number | string;
  tip_amount: number | string;
  processing_fee_on_tip: number | string;
};

type StaffLiability = {
  name: string;
  current_tip_balance: number;
};

type DateFilter = 'all' | '7d' | '30d' | 'year';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTips: 0,
    totalLeak: 0,
  });
  const [staffLiability, setStaffLiability] = useState<StaffLiability[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<DateFilter>('all');

  async function loadDashboardData() {
    setLoading(true);
    try {
      let query = supabase
        .from('transactions')
        .select('service_amount, tip_amount, processing_fee_on_tip');

      if (filter !== 'all') {
        const date = new Date();
        if (filter === '7d') date.setDate(date.getDate() - 7);
        if (filter === '30d') date.setDate(date.getDate() - 30);
        if (filter === 'year') date.setFullYear(date.getFullYear() - 1);
        
        query = query.gte('created_at', date.toISOString());
      }

      const { data: txData } = await query;

      if (txData) {
        const transactions = txData as DashboardTransaction[];
        const revenue = transactions.reduce((acc, curr) => acc + Number(curr.service_amount), 0);
        const tips = transactions.reduce((acc, curr) => acc + Number(curr.tip_amount), 0);
        const leak = transactions.reduce((acc, curr) => acc + Number(curr.processing_fee_on_tip), 0);
        setStats({ totalRevenue: revenue, totalTips: tips, totalLeak: leak });
      }

      const { data: staffData } = await supabase
        .from('staff')
        .select('name, current_tip_balance')
        .order('current_tip_balance', { ascending: false });

      setStaffLiability((staffData as StaffLiability[] | null) || []);
    } catch (e) {
      console.error('Error loading dashboard:', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Business Overview</h1>
            <p className="text-slate-500">Tracking your revenue and tip leaks.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as DateFilter)}
              className="text-sm bg-white border border-slate-200 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Time</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
            <button 
              onClick={loadDashboardData}
              className="text-sm bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Refresh
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-sm font-medium text-slate-500 mb-1">Total Tips Collected</p>
                <p className="text-3xl font-bold text-teal-600">${stats.totalTips.toFixed(2)}</p>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100">
                <p className="text-sm font-medium text-red-600 mb-1">THE MONEY LEAK (Fees)</p>
                <p className="text-3xl font-bold text-red-600">-${stats.totalLeak.toFixed(2)}</p>
                <p className="text-xs text-red-400 mt-2">Processing fees lost on staff tips</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-semibold text-slate-700">Current Staff Liabilities</h2>
                <p className="text-xs text-slate-500">Amount currently owed to employees in tips</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-3 font-medium">Employee</th>
                      <th className="px-6 py-3 font-medium text-right">Amount Owed</th>
                      <th className="px-6 py-3 font-medium text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {staffLiability.length === 0 ? (
                      <tr><td colSpan={3} className="px-6 py-10 text-center text-slate-400">No staff balance data.</td></tr>
                    ) : (
                      staffLiability.map((member) => (
                        <tr key={member.name} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{member.name}</td>
                          <td className="px-6 py-4 text-right font-mono font-bold text-teal-600">
                            ${member.current_tip_balance.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 uppercase">
                              Unpaid
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
