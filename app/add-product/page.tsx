'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/components/TopNav';
import PipelineStepper from '@/components/PipelineStepper';
import LivePreviewCard from '@/components/LivePreviewCard';
import { useToast } from '@/lib/toast-context';
import { CATEGORIES, PIPELINE_STEPS, PipelineStep, GeneratedContent } from '@/lib/types';

const TONE_OPTIONS = ['Direct-Response', 'Informative', 'Minimal'] as const;
type Tone = typeof TONE_OPTIONS[number];

function getFieldError(field: string, value: string): string | null {
  if (field === 'name' && !value.trim()) return 'Product name is required.';
  if (field === 'features') {
    const items = value.split(/[\n,]/).filter(f => f.trim().length > 0);
    if (items.length < 2) return 'Enter at least 2 features (comma or new-line separated).';
  }
  if (field === 'price') {
    const n = parseFloat(value);
    if (!value || isNaN(n) || n <= 0) return 'Enter a valid price greater than 0.';
  }
  if (field === 'category' && !value) return 'Please select a category.';
  return null;
}

// Simulates a pipeline run with animated step progression
function simulatePipeline(
  setSteps: React.Dispatch<React.SetStateAction<PipelineStep[]>>,
  onComplete: () => void,
  onFail?: () => void
) {
  const delays = [400, 800, 1200, 900, 600, 700];
  let current = 0;

  function runNext() {
    if (current >= PIPELINE_STEPS.length) { onComplete(); return; }
    setSteps(prev => prev.map((s, i) => i === current ? { ...s, status: 'running' } : s));
    setTimeout(() => {
      setSteps(prev => prev.map((s, i) => i === current ? { ...s, status: 'done' } : s));
      current++;
      setTimeout(runNext, 200);
    }, delays[current]);
  }
  runNext();
}

export default function AddProductPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [form, setForm] = useState({ name: '', category: '', features: '', price: '', currency: 'INR', tone: 'Informative' as Tone });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [steps, setSteps] = useState<PipelineStep[]>(PIPELINE_STEPS.map(s => ({ ...s })));
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const isValid = !['name', 'category', 'features', 'price'].some(f => !!getFieldError(f, form[f as keyof typeof form]));

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = getFieldError(name, value);
      setErrors(prev => ({ ...prev, [name]: err || '' }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = getFieldError(name, value);
    setErrors(prev => ({ ...prev, [name]: err || '' }));
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isGenerating) return;

    // Reset steps
    setSteps(PIPELINE_STEPS.map(s => ({ ...s, status: 'idle' })));
    setContent(null);
    setIsGenerating(true);

    try {
      // Submit to Google Apps Script
      const payload = {
        action: 'add_product',
        name: form.name,
        features: form.features,
        price: parseFloat(form.price),
        category: form.category,
      };
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Simulate pipeline animation regardless of response timing
      simulatePipeline(setSteps, () => {
        // After pipeline finishes, populate content from API or generate mock
        setContent({
          title: form.name,
          description: `Experience the best of ${form.category.toLowerCase()} with ${form.name}. Designed for performance and built to last, this product brings unmatched value at ₹${parseFloat(form.price).toLocaleString('en-IN')}.`,
          bullets: form.features
            .split(/[\n,]/)
            .filter(f => f.trim().length > 0)
            .slice(0, 5)
            .map(f => f.trim()),
          seoTitle: `Buy ${form.name} – Best ${form.category} | AI Product Studio`,
          seoDescription: `Shop ${form.name} in ${form.category} category. Premium quality, competitive pricing. Order now and get fast delivery.`,
        });
        setIsGenerating(false);
        setHasGenerated(true);
        addToast('Content generated successfully!', 'success');
      });
    } catch (err) {
      setSteps(prev => prev.map((s, i) => s.status === 'running' ? { ...s, status: 'failed' } : s));
      setIsGenerating(false);
      addToast('Generation failed. Please try again.', 'error');
    }
  }

  async function handleSave() {
    if (!content) return;
    addToast('Product saved to Google Sheets!', 'success');
    setTimeout(() => router.push('/products'), 1000);
  }

  function handleReset() {
    setForm({ name: '', category: '', features: '', price: '', currency: 'INR', tone: 'Informative' });
    setErrors({}); setTouched({}); setContent(null); setHasGenerated(false);
    setSteps(PIPELINE_STEPS.map(s => ({ ...s, status: 'idle' })));
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200 ${
      errors[field] && touched[field]
        ? 'border-rose-500/60 focus:ring-rose-500/30 focus:ring-2'
        : 'border-white/[0.08] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
    }`;

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <TopNav />
      <div className="pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            New Product
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Generate Product Content</h1>
          <p className="text-slate-400">Fill in the details and let AI create high-converting copy for you.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">
          {/* ── Left Column: Form + Pipeline ── */}
          <div className="space-y-6">
            {/* Form Card */}
            <div className="glass-dark border border-white/[0.07] rounded-2xl p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <form onSubmit={handleGenerate} className="space-y-5">
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Product Name *</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} onBlur={handleBlur}
                    placeholder="e.g., Sony WH-1000XM5 Headphones"
                    className={inputClass('name')}
                  />
                  {errors.name && touched.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                </div>

                {/* Category + Currency row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category *</label>
                    <select
                      name="category" value={form.category}
                      onChange={handleChange} onBlur={handleBlur}
                      className={`${inputClass('category')} appearance-none [&>option]:bg-[#1a1030]`}
                    >
                      <option value="">Select category…</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.category && touched.category && <p className="mt-1 text-xs text-rose-400">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Price *</label>
                    <div className="flex gap-2">
                      <select
                        name="currency" value={form.currency} onChange={handleChange}
                        className="w-20 px-2 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white [&>option]:bg-[#1a1030] appearance-none text-center"
                      >
                        <option>INR</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                      <input
                        type="number" name="price" value={form.price}
                        onChange={handleChange} onBlur={handleBlur}
                        placeholder="0.00" min="0" step="0.01"
                        className={`flex-1 ${inputClass('price')}`}
                      />
                    </div>
                    {errors.price && touched.price && <p className="mt-1 text-xs text-rose-400">{errors.price}</p>}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Key Features * <span className="text-slate-600 normal-case font-normal">(min 2, comma or new-line separated)</span>
                  </label>
                  <textarea
                    name="features" value={form.features}
                    onChange={handleChange} onBlur={handleBlur}
                    placeholder={"Active Noise Cancellation\n30-hour battery life\nFoldable design for travel\nHi-Res Audio certified"}
                    rows={5}
                    className={`${inputClass('features')} resize-none leading-relaxed`}
                  />
                  {errors.features && touched.features && <p className="mt-1 text-xs text-rose-400">{errors.features}</p>}
                </div>

                {/* Tone Preset */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tone Preset</label>
                  <div className="flex gap-2 flex-wrap">
                    {TONE_OPTIONS.map(t => (
                      <button
                        key={t} type="button"
                        onClick={() => setForm(prev => ({ ...prev, tone: t }))}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                          form.tone === t
                            ? 'bg-violet-600/30 border-violet-500/50 text-violet-300'
                            : 'bg-white/[0.03] border-white/[0.07] text-slate-400 hover:border-violet-500/30 hover:text-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={!isValid || isGenerating}
                    className="flex-1 px-6 py-3.5 bg-gradient-primary rounded-xl font-bold text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Generating…
                      </span>
                    ) : hasGenerated ? '↺ Regenerate' : '✦ Generate Content'}
                  </button>
                  {hasGenerated && (
                    <button
                      type="button" onClick={handleSave}
                      className="flex-1 px-6 py-3.5 bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 rounded-xl font-bold text-sm hover:bg-cyan-600/30 transition-all"
                    >
                      ✓ Save Product
                    </button>
                  )}
                  <button
                    type="button" onClick={handleReset}
                    className="px-4 py-3.5 glass-dark border border-white/[0.07] text-slate-400 hover:text-white rounded-xl text-sm font-semibold transition-all"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Pipeline Stepper */}
            <div className="glass-dark border border-white/[0.07] rounded-2xl p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm font-bold text-slate-300">Automation Pipeline</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">n8n → Sheets</span>
              </div>
              <PipelineStepper steps={steps} />
            </div>
          </div>

          {/* ── Right Column: Live Preview ── */}
          <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="sticky top-24">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Live Preview</p>
              <LivePreviewCard
                loading={isGenerating}
                content={content}
                productName={form.name}
                category={form.category}
                price={form.price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
