'use client';

import React from 'react';

const features = [
  {
    title: 'AI Roadmap Generator',
    description: 'Create data‑driven product roadmaps in seconds with generative AI.',
    icon: '🗺️',
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
  },
  {
    title: 'Sentiment Analysis',
    description: 'Turn user feedback into actionable insights instantly using NLP.',
    icon: '💬',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Task Prioritization',
    description: 'ML‑powered scoring to focus on high‑impact features and bugs.',
    icon: '⚡',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'Jira / Notion Sync',
    description: 'Two‑way sync with your favorite product management tools.',
    icon: '🔗',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feat, idx) => (
        <div
          key={idx}
          className="relative glass-dark p-8 rounded-2xl border border-white/[0.07] hover:border-violet-500/40 hover:bg-white/[0.04] transition-all duration-500 group overflow-hidden"
        >
          {/* Background Gradient Glow */}
          <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${feat.gradient} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />
          
          <div className="relative z-10">
            <div className="w-14 h-14 flex items-center justify-center text-3xl bg-white/[0.04] border border-white/[0.08] rounded-2xl mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
