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

  if (!content) {
    return (
      <div className="glass-dark border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[320px] animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-3xl mb-4">
          ✦
        </div>
        <p className="font-semibold text-slate-300 mb-1">No content generated yet</p>
        <p className="text-sm text-slate-500">Fill in the form and click <strong className="text-violet-400">Generate Content</strong></p>
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
          {content.title || productName}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed">
          {content.description}
        </p>

        {/* Bullets */}
        {content.bullets.length > 0 && (
          <ul className="space-y-2">
            {content.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold">✓</span>
                {b}
              </li>
            ))}
          </ul>
        )}

        {/* SEO section */}
        <div className="border-t border-white/[0.06] pt-4 space-y-2">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">SEO Preview</p>
          <p className="text-sm font-semibold text-cyan-300">{content.seoTitle}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{content.seoDescription}</p>
        </div>
      </div>
    </div>
  );
}
