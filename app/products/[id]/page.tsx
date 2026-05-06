'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TopNav from '@/components/TopNav';
import { useToast } from '@/lib/toast-context';
import { getProductById } from '@/lib/api';
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

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    setIsLoading(true);
    try {
      const result = await getProductById(productId);
      if (result.success && result.data) {
        setProduct(result.data);
      } else {
        addToast('Product not found', 'error');
        router.push('/products');
      }
    } catch {
      addToast('An error occurred', 'error');
      router.push('/products');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0a1e]">
        <TopNav />
        <div className="pt-32 flex justify-center">
          <div className="skeleton w-full max-w-4xl h-96 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <TopNav />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Back link */}
        <button 
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-400 transition-colors uppercase tracking-widest"
        >
          ← Back to Catalog
        </button>

        {/* Hero Area */}
        <div className="glass-dark border border-white/[0.07] rounded-[2.5rem] overflow-hidden mb-8 animate-fade-up">
          <div className="h-2 w-full bg-gradient-primary" />
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-widest ${STATUS_COLORS[product.status] || 'status-pending'}`}>
                    {product.status?.replace('_', ' ')}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{product.name}</h1>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-tighter">ID: {product.id}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Pricing</p>
                <p className="text-4xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Side: Raw Data */}
              <div className="space-y-8">
                <section>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Input Features</h2>
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {product.features}
                  </div>
                </section>
                <section>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Metadata</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Created</p>
                      <p className="text-sm text-slate-300">{formatDate(product.createdAt)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Last Updated</p>
                      <p className="text-sm text-slate-300">{formatDate(product.updatedAt)}</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Side: AI Output */}
              <div className="space-y-8">
                <section>
                  <h2 className="text-xs font-bold text-violet-400 uppercase tracking-[0.2em] mb-4">AI Optimized Copy</h2>
                  {product.description ? (
                    <div className="p-6 rounded-2xl bg-violet-600/10 border border-violet-500/20 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
                      <p className="text-slate-200 leading-relaxed">{product.description}</p>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center">
                      <p className="text-sm text-slate-500">Content generation in progress…</p>
                    </div>
                  )}
                </section>

                <section>
                  <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-4">SEO & Tags</h2>
                  <div className="space-y-4">
                    {product.seoKeywords && product.seoKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.seoKeywords.map((k, i) => (
                          <span key={i} className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                            {k}
                          </span>
                        ))}
                      </div>
                    )}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((t, i) => (
                          <span key={i} className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-400 text-xs font-semibold">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <button className="flex-1 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-violet-900/20">
            Edit Content
          </button>
          <button className="flex-1 py-4 glass-dark border border-white/[0.07] text-slate-300 hover:text-white rounded-2xl font-bold transition-all">
            Duplicate
          </button>
          <button className="px-8 py-4 bg-rose-600/10 border border-rose-500/20 text-rose-400 hover:bg-rose-600/20 rounded-2xl font-bold transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
