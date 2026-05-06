'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TopNav from '@/components/TopNav';
import FeaturesGrid from '@/components/FeaturesGrid';
import ChatbotDemo from '@/components/ChatbotDemo';
import Pricing from '@/components/Pricing';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white">
      {/* ── Background Effects ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/10 rounded-full blur-[140px]" />
      </div>

      <TopNav />

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-violet-300 font-bold mb-8 animate-fade-up shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            Empowering 2,000+ Product Teams
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.05] mb-8 animate-fade-up">
            AI-Powered <br className="hidden md:block" />
            <span className="text-gradient">Product Management</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Build Faster, Ship Smarter. Automate roadmaps, user insights, and 
            high-converting product descriptions in seconds with our integrated AI pipeline.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link 
              href="/add-product" 
              className="w-full sm:w-auto px-10 py-5 bg-gradient-primary rounded-2xl font-black text-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:-translate-y-1 transition-all duration-300 border border-white/10"
            >
              Start Building Now – Free
            </Link>
            <Link 
              href="/products" 
              className="w-full sm:w-auto px-10 py-5 glass border border-white/10 rounded-2xl font-black text-lg hover:bg-white/[0.1] hover:-translate-y-1 transition-all duration-300"
            >
              Explore Examples
            </Link>
          </div>
        </div>

        {/* Hero Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent blur-3xl animate-pulse" />
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="relative py-24 md:py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Built for Modern Teams</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Everything you need to automate your product content workflow and gather actionable insights.
            </p>
          </div>
          <FeaturesGrid />
        </div>
      </section>

      {/* ── Chatbot Demo Section ── */}
      <section className="relative py-24 md:py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">
              Interactive Demo
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Your Personal PM Assistant</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Ask questions about your roadmap, request sentiment analysis summaries, or get copy variants instantly. Our AI is trained on thousands of successful product launches.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-violet-400 font-black text-2xl mb-1">98%</div>
                <div className="text-xs text-slate-500 uppercase font-bold">Accuracy Rate</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-cyan-400 font-black text-2xl mb-1">&lt; 2s</div>
                <div className="text-xs text-slate-500 uppercase font-bold">Response Time</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl">
            <ChatbotDemo />
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section id="pricing" className="relative py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Simple, Scalable Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Start for free and scale as your product catalog grows.
            </p>
          </div>
          <Pricing />
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="relative py-24 md:py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Trusted by Founders</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              See how leaders are using AI Product Studio to scale their operations.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative py-24 md:py-40 px-6">
        <div className="max-w-5xl mx-auto glass-dark border border-white/[0.1] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-600/10 rounded-full blur-[120px]" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to automate your <br className="hidden md:block" /> content pipeline?</h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
              Join thousands of PMs and founders who are saving hours every week with AI Product Studio.
            </p>
            <Link 
              href="/add-product" 
              className="inline-block px-12 py-6 bg-white text-[#0f0a1e] rounded-2xl font-black text-xl hover:bg-slate-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300"
            >
              Get Started for Free
            </Link>
            <p className="text-slate-600 text-sm mt-6 font-bold uppercase tracking-widest">No credit card required</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative py-12 px-6 border-t border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center font-black text-xs">AI</div>
            <span className="font-extrabold tracking-tight text-white">Product Studio</span>
          </div>
          
          <div className="flex gap-8 text-sm font-semibold text-slate-500">
            <Link href="/add-product" className="hover:text-white transition-colors">Generate</Link>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <Link href="/logs" className="hover:text-white transition-colors">Logs</Link>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>

          <div className="text-slate-600 text-sm font-bold">
            © {new Date().getFullYear()} AI Product Studio.
          </div>
        </div>
      </footer>
    </div>
  );
}
