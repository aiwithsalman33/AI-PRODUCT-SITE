'use client';

import React, { useState } from 'react';
import TopNav from '@/components/TopNav';

interface LogEntry {
  id: string;
  productId: string;
  productName: string;
  startedAt: string;
  duration: string;
  status: 'Success' | 'Failed';
  error?: string;
}

export default function LogsPage() {
  const [filter, setFilter] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const filteredLogs = logs.filter(log => 
    log.productName.toLowerCase().includes(filter.toLowerCase()) ||
    log.productId.toLowerCase().includes(filter.toLowerCase()) ||
    log.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <TopNav />
      <div className="pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            System Logs
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">Pipeline Activity</h1>
          <p className="text-slate-400 mt-1">Monitor the performance and status of your AI generation runs.</p>
        </div>

        {/* Filter */}
        <div className="mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <input
            type="text"
            placeholder="Search logs by product, ID, or status…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Table */}
        <div className="glass-dark border border-white/[0.07] rounded-2xl overflow-hidden animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Run ID', 'Product', 'Started At', 'Duration', 'Status', 'Message'].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-5 py-4 font-mono text-xs text-slate-400">{log.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-white">{log.productName}</span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{log.productId}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-xs">
                        {new Date(log.startedAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-slate-400 font-medium">{log.duration}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${
                          log.status === 'Success' 
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500 italic max-w-xs truncate">
                        {log.error || 'Pipeline completed successfully.'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-slate-500">
                      No runs yet — trigger a generation to see activity logs.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
