'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  from: 'user' | 'bot';
  text: string;
  time: string;
}

export default function ChatbotDemo() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hi! I am your AI Product assistant. Need help with roadmaps or copy? Ask me anything!', time: 'Now' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { from: 'user', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      const botMsg: Message = { 
        from: 'bot', 
        text: `That is a great question about "${userMsg.text}". I can help you prioritize that in your roadmap or generate a specialized description for it.`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto glass-dark border border-white/[0.07] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[500px] animate-fade-up">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center font-bold text-xs shadow-lg">AI</div>
          <div>
            <h4 className="text-sm font-bold text-white">Product Studio AI</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Always Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.from === 'user'
                  ? 'bg-violet-600 text-white rounded-br-none'
                  : 'bg-white/[0.06] text-slate-200 border border-white/[0.08] rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-slate-600 mt-1 px-1 font-semibold uppercase">{msg.time}</span>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="bg-white/[0.06] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-4 pr-12 py-3.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-all"
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-2 w-9 h-9 bg-gradient-primary rounded-lg flex items-center justify-center text-white shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all"
          >
            ✦
          </button>
        </div>
      </div>
    </div>
  );
}
