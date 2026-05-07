'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import TopNav from '@/components/TopNav';
import { useToast } from '@/lib/toast-context';
import { getProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatDate } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  received:        'status-received',
  pending_approval:'status-pending',
  generated:       'status-generated',
  published:       'status-published',
  rejected:        'status-rejected',
  failed:          'status-failed',
};

export default function ProductsPage() {
  const { addToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const result = await getProducts();
      if (result.success && Array.isArray(result.data)) {
        setProducts(result.data);
      } else {
        addToast('Failed to load products', 'error');
      }
    } catch {
      addToast('Could not reach the server', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  const filtered = useMemo(() => products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchStatus;
  }), [products, search, statusFilter]);

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <TopNav />
      <div className="pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Products
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">Your Products</h1>
            <p className="text-slate-400 mt-1">{products.length} total · {filtered.length} shown</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchProducts} className="px-4 py-2.5 glass-dark border border-white/[0.07] text-slate-300 hover:text-white rounded-xl text-sm font-semibold transition-all">
              ↻ Refresh
            </button>
            <Link href="/add-product" className="px-5 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all">
              + New Product
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <input
            type="text" placeholder="Search products…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500"
          />
          <select
            value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white [&>option]:bg-[#1a1030] appearance-none focus:outline-none focus:border-violet-500 w-full sm:w-48"
          >
            <option value="">All statuses</option>
            <option value="received">Received</option>
            <option value="pending_approval">Pending</option>
            <option value="generated">Generated</option>
            <option value="published">Published</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="glass-dark border border-white/[0.07] rounded-2xl overflow-hidden animate-fade-up" style={{ animationDelay: '0.15s' }}>
          {isLoading ? (
            <div className="p-8 space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-3xl mb-4">◈</div>
              <p className="font-semibold text-slate-300 mb-1">No products yet</p>
              <p className="text-sm text-slate-500 mb-6">Create your first product to get started</p>
              <Link href="/add-product" className="px-5 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-bold">
                + New Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Product Name', 'Category', 'Price', 'Status', 'Created', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-5 py-4">
                        <span className="font-semibold text-white group-hover:text-violet-300 transition-colors">{p.name}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-300 font-semibold">
                        ₹{typeof p.price === 'number' ? p.price.toLocaleString('en-IN') : p.price}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold capitalize ${STATUS_COLORS[p.status] || 'status-pending'}`}>
                          {p.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs">{formatDate(p.createdAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Link href={`/products/${p.id}`} className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-violet-600/20 text-slate-400 hover:text-violet-300 text-xs font-semibold border border-white/[0.06] transition-all">
                            View
                          </Link>
                          <button className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-cyan-600/20 text-slate-400 hover:text-cyan-300 text-xs font-semibold border border-white/[0.06] transition-all">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
