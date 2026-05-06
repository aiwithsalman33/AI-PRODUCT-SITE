'use client';

import React from 'react';

const tiers = [
  {
    name: 'Free',
    price: '₹0',
    description: 'Perfect for exploring AI possibilities.',
    features: ['5 generations per month', 'Basic AI copy variants', '1-sheet sync', 'Community support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹2,499',
    unit: '/mo',
    description: 'For growing e-commerce founders.',
    features: ['Unlimited generations', 'Bulk CSV/Sheet import', 'Priority support', 'Jira & Notion sync', 'Advanced SEO presets'],
    cta: 'Go Pro Now',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Advanced solutions for large teams.',
    features: ['Dedicated manager', 'SLA guarantees', 'SSO & Role-based access', 'On-prem deployment', 'Custom AI training'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`relative glass-dark border rounded-[2rem] p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
            tier.popular 
              ? 'border-violet-500/40 bg-violet-500/[0.04] shadow-[0_0_40px_rgba(124,58,237,0.15)]' 
              : 'border-white/[0.07]'
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              Most Popular
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
            <p className="text-slate-400 text-sm">{tier.description}</p>
          </div>

          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black text-white">{tier.price}</span>
            {tier.unit && <span className="text-slate-500 font-semibold">{tier.unit}</span>}
          </div>

          <ul className="flex-1 space-y-4 mb-10">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] flex items-center justify-center font-bold">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <button
            className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
              tier.popular
                ? 'bg-gradient-primary text-white hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:-translate-y-1'
                : 'bg-white/[0.06] text-slate-300 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white'
            }`}
          >
            {tier.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
