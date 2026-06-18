'use client';

import { useState } from 'react';
import { Save, Image as ImageIcon, Type, Sparkles, Layout } from 'lucide-react';

export default function LoginConfigTab() {
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState({
    welcomeTitle: 'Welcome back to AURA',
    subtitle: 'Sign in to manage your clinic operations',
    bgImageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    primaryColor: '#f43f5e', // rose-500 equivalent
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Login page configuration saved successfully!');
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Editor Form */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-lg text-slate-800">Login Page Appearance</h3>
          <p className="text-sm text-slate-500 font-medium">Customize what your staff sees when signing in.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> Welcome Title
            </label>
            <input
              type="text"
              required
              value={config.welcomeTitle}
              onChange={(e) => setConfig({ ...config, welcomeTitle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> Subtitle
            </label>
            <input
              type="text"
              required
              value={config.subtitle}
              onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> Background Image URL
            </label>
            <input
              type="url"
              value={config.bgImageUrl}
              onChange={(e) => setConfig({ ...config, bgImageUrl: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
              placeholder="https://..."
            />
            <p className="text-[10px] text-slate-400">Provide a high-quality image URL for the login background.</p>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-amber-400 transition-all text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-rose-200"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : 'Publish Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Live Preview */}
      <div className="p-6 rounded-2xl border border-rose-100 bg-rose-50/50 space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-800 mb-1 flex items-center gap-2">
            <Layout className="w-4 h-4 text-rose-500" /> Live Preview
          </h3>
          <p className="text-xs text-slate-500 font-medium">This is how the login screen will appear.</p>
        </div>

        {/* Mock Login Screen */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-md flex bg-white">
          {/* Left Side: Mock Image */}
          <div 
            className="hidden md:block w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${config.bgImageUrl || 'https://via.placeholder.com/400x600?text=No+Image'})` }}
          >
            <div className="w-full h-full bg-rose-900/20 backdrop-blur-[2px]"></div>
          </div>
          
          {/* Right Side: Mock Form */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center text-center bg-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-400 to-amber-100 flex items-center justify-center shadow-md shadow-rose-200 mb-4">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            
            <h2 className="font-bold text-base text-slate-800 mb-1 leading-tight">
              {config.welcomeTitle}
            </h2>
            <p className="text-[10px] text-slate-500 font-medium mb-6">
              {config.subtitle}
            </p>

            <div className="w-full max-w-[200px] space-y-3">
              <div className="w-full h-8 bg-slate-50 border border-slate-200 rounded-md"></div>
              <div className="w-full h-8 bg-slate-50 border border-slate-200 rounded-md"></div>
              <div 
                className="w-full h-8 rounded-md shadow-sm mt-2 opacity-80 flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor }}
              >
                <span className="text-[10px] font-bold text-white">Sign In</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
