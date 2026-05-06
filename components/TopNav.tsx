'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/add-product', label: 'New Product', icon: '✦' },
  { href: '/products',    label: 'Products',    icon: '◈' },
  { href: '/logs',        label: 'Logs',        icon: '◎' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/[0.07] px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center font-black text-sm shadow-[0_0_16px_rgba(124,58,237,0.6)] group-hover:scale-110 transition-transform">
            AI
          </div>
          <span className="text-base font-extrabold tracking-tight hidden sm:block">
            Product<span className="text-gradient">Studio</span>
          </span>
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  active
                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span className="text-xs">{icon}</span>
                <span className="hidden sm:block">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Connection indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-white/[0.06]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs text-slate-400 font-semibold hidden sm:block">Sheets Connected</span>
        </div>
      </div>
    </nav>
  );
}
