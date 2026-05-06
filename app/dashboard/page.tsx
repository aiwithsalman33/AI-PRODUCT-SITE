'use client';

import React, { useEffect, useState } from 'react';
import TopNav from '@/components/TopNav';
import Link from 'next/link';
import { getDashboardStats, getProducts } from '@/lib/api';
import { Product, DashboardStats } from '@/lib/types';
import { useToast } from '@/lib/toast-context';

export default function DashboardPage() {
  const { addToast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({ total_products: 0, pending: 0, published: 0, rejected: 0 });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setIsLoading(true);
    try {
      const [statsRes, productsRes] = await Promise.all([
        getDashboardStats(),
        getProducts()
      ]);

      if (statsRes.success && statsRes.data) setStats(statsRes.data);
      if (productsRes.success && productsRes.data) {
        setRecentProducts(productsRes.data.slice(0, 5));
      }
    } catch {
      addToast('Failed to load dashboard data', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  const statCards = [
    { label: 'Total Products', value: stats.total_products, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { label: 'Published',      value: stats.published,      color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Pending AI',     value: stats.pending,        color: 'text-amber-400',   bg: 'bg-amber-500/10' },
    { label: 'Issues',         value: stats.rejected,       color: 'text-rose-400',    bg: 'bg-rose-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <TopNav />
      <div className="pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 animate-fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Overview
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">Quick summary of your product content automation.</p>
          </div>
          <Link href="/add-product" className="px-5 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all">
            + New Generation
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {statCards.map((s, i) => (
            <div key={i} className="glass-dark border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden group">
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${s.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 relative z-10">{s.label}</p>
              <p className={`text-4xl font-black ${s.color} relative z-10`}>{isLoading ? '…' : s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {/* Recent Products */}
          <div className="glass-dark border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="font-bold text-white">Recent Generations</h3>
              <Link href="/products" className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest">View All</Link>
            </div>
            <div className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-12 w-full rounded-xl" />)}
                </div>
              ) : recentProducts.length === 0 ? (
                <div className="p-20 text-center text-slate-500 text-sm">No products found. Start by adding one!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs font-bold text-slate-600 uppercase tracking-widest">
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {recentProducts.map(p => (
                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-200">{p.name}</td>
                          <td className="px-6 py-4">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-400 font-bold uppercase tracking-wider">
                              {p.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">
                            {new Date(p.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links / Tips */}
          <div className="space-y-6">
            <div className="glass-dark border border-white/[0.07] rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/logs" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] transition-all group">
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white">View System Logs</span>
                  <span className="text-slate-600 group-hover:text-violet-400">→</span>
                </Link>
                <Link href="/add-product" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] transition-all group">
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Bulk Import (Beta)</span>
                  <span className="text-slate-600 group-hover:text-violet-400">→</span>
                </Link>
              </div>
            </div>

            <div className="glass-dark border border-violet-500/20 bg-violet-500/[0.03] rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-2xl opacity-20">💡</div>
              <h3 className="font-bold text-violet-300 mb-2">Pro Tip</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect your Google Sheet to automatically sync your AI-generated descriptions with your store catalog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
