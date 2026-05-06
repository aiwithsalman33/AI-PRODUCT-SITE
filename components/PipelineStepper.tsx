'use client';

import React from 'react';
import { PipelineStep } from '@/lib/types';

interface PipelineStepperProps {
  steps: PipelineStep[];
}

const statusConfig = {
  idle:    { icon: '○', ring: 'border-white/20',       bg: 'bg-white/5',          text: 'text-slate-500',  label: 'Waiting'  },
  running: { icon: '◌', ring: 'border-violet-500',     bg: 'bg-violet-500/20',    text: 'text-violet-300', label: 'Running'  },
  done:    { icon: '✓', ring: 'border-cyan-500',       bg: 'bg-cyan-500/20',      text: 'text-cyan-300',   label: 'Done'     },
  failed:  { icon: '✕', ring: 'border-rose-500',       bg: 'bg-rose-500/20',      text: 'text-rose-300',   label: 'Failed'   },
};

export default function PipelineStepper({ steps }: PipelineStepperProps) {
  return (
    <div className="relative">
      {/* Vertical connector */}
      <div className="absolute left-5 top-6 bottom-6 w-px bg-white/[0.07]" />

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const cfg = statusConfig[step.status];
          const prevDone = idx === 0 || steps[idx - 1].status === 'done';

          return (
            <div
              key={step.id}
              className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-500 ${
                step.status === 'running'
                  ? 'border-violet-500/30 bg-violet-500/[0.06] shadow-[0_0_20px_rgba(124,58,237,0.1)]'
                  : step.status === 'done'
                  ? 'border-cyan-500/20 bg-cyan-500/[0.04]'
                  : step.status === 'failed'
                  ? 'border-rose-500/30 bg-rose-500/[0.06]'
                  : 'border-white/[0.05] bg-white/[0.02]'
              }`}
            >
              {/* Icon */}
              <div
                className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 ${cfg.ring} ${cfg.bg} flex items-center justify-center font-bold text-sm ${cfg.text} transition-all duration-300`}
              >
                {step.status === 'running' ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full" />
                ) : (
                  cfg.icon
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Step {step.id}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${cfg.bg} ${cfg.ring} ${cfg.text}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="font-semibold text-white mt-0.5">{step.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{step.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
