'use client';

import React, { useState } from 'react';

const testimonials = [
  {
    author: 'Salman Khan',
    role: 'CEO at AI Product Studio',
    text: 'The AI content studio has transformed our product management workflow. We now launch products 5x faster than before.',
    avatar: 'S',
  },
  {
    author: 'Ayesha Gupta',
    role: 'E-commerce Specialist',
    text: 'Getting SEO-optimized descriptions used to take hours. Now it takes seconds. The quality is surprisingly human-like.',
    avatar: 'A',
  },
  {
    author: 'Rohan Sharma',
    role: 'Product Manager',
    text: 'The pipeline visibility is a game-changer. I know exactly what the AI is doing at every step. Total transparency.',
    avatar: 'R',
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const { author, role, text, avatar } = testimonials[index];

  return (
    <div className="relative max-w-3xl mx-auto glass-dark border border-white/[0.07] rounded-[2.5rem] p-8 md:p-12 text-center animate-fade-up">
      {/* Quote Icon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl shadow-xl">
        “
      </div>

      <p className="text-xl md:text-2xl text-slate-200 font-medium italic leading-relaxed mb-10">
        “{text}”
      </p>

      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-xl text-white mb-4 border-2 border-white/10 shadow-lg">
          {avatar}
        </div>
        <div className="font-bold text-white text-lg tracking-tight">{author}</div>
        <div className="text-gradient-warm text-sm font-semibold uppercase tracking-widest">{role}</div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-10">
        <button 
          onClick={prev} 
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.1] hover:border-violet-500/30 transition-all"
        >
          ←
        </button>
        <button 
          onClick={next} 
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.1] hover:border-violet-500/30 transition-all"
        >
          →
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-violet-500' : 'w-2 bg-white/10'}`} 
          />
        ))}
      </div>
    </div>
  );
}
