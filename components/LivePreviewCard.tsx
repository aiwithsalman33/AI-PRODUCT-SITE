'use client';

import React from 'react';
import { GeneratedContent } from '@/lib/types';

interface LivePreviewCardProps {
  loading: boolean;
  content: GeneratedContent | null;
  productName: string;
  category: string;
  price: string;
}

export default function LivePreviewCard({
  loading,
  content,
  productName,
  category,
  price,
}: LivePreviewCardProps) {
  if (loading) {
    return (
      <div className="glass-dark border border-white/[0.07] rounded-2xl p-6 space-y-4 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <span className="animate-spin inline-block w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full" />
          <span className="text-sm text-violet-300 font-semibold">Generating content…</span>
        </div>
        {/* Skeleton rows */}
        <div className="skeleton h-5 w-1/3 rounded" />
        <div className="skeleton h-8 w-2/3 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="skeleton h-4 w-4/6 rounded" />
        <div className="space-y-2 pt-2">
          <div className="skeleton h-3 w-1/2 rounded" />
          <div className="skeleton h-3 w-2/5 rounded" />
          <div className="skeleton h-3 w-3/5 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-dark border border-violet-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.1)] animate-fade-up">
      {/* Header gradient bar */}
      <div className="h-1 w-full bg-gradient-primary" />

      <div className="p-6 space-y-5">
        {/* Category + Price row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 uppercase tracking-widest">
            {category || 'Category'}
          </span>
          <span className="text-lg font-extrabold text-white">
            ₹{parseFloat(price || '0').toLocaleString('en-IN')}
          </span>
        </div>

        {/* Product name */}
        <h3 className="text-xl font-bold text-white leading-tight">
          {content?.title || productName || 'Product Name'}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed italic">
          {content?.description || 'Your AI-optimized description will appear here after saving...'}
        </p>

        {/* Bullets */}
        <div className="space-y-2">
          {(content?.bullets || ['Feature 1...', 'Feature 2...']).map((b, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-500">
              <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-white/5 text-slate-600 text-[10px] flex items-center justify-center font-bold">?</span>
              {b}
            </div>
          ))}
        </div>

        {/* SEO section */}
        <div className="border-t border-white/[0.06] pt-4 space-y-2 opacity-50">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-bold mb-2">SEO Preview</p>
          <p className="text-sm font-semibold text-slate-500">{content?.seoTitle || 'SEO Title...'}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{content?.seoDescription || 'Meta description...'}</p>
        </div>
      </div>
    </div>
  );
}
