// ThemeToggle component – switches between dark and light mode
'use client';

import React from 'react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
      aria-label="Toggle dark mode"
    >
      <span className="w-4 h-4 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(192,38,211,0.6)]" />
      <span className="text-sm text-slate-300">{darkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
}
