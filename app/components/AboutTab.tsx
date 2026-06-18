'use client';

import { useState } from 'react';
import { Save, Building2, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function AboutTab() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: 'AURA Clinic Manager',
    tagline: 'Premium Aesthetic & Wellness Center',
    description: 'We provide state-of-the-art aesthetic treatments with personalized care. Our mission is to enhance natural beauty and boost confidence.',
    address: '123 Sukhumvit Road, Khlong Toei, Bangkok 10110',
    phone: '+66 81 234 5678',
    email: 'contact@auraclinic.com',
    operatingHours: 'Mon-Sun: 10:00 AM - 08:00 PM',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Clinic profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Edit Form */}
      <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-lg text-slate-800">Clinic Profile</h3>
          <p className="text-sm text-slate-500 font-medium">Update the public information and contact details of your clinic.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Clinic Name
              </label>
              <input
                type="text"
                required
                value={formData.clinicName}
                onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              About Description
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Physical Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Operating Hours
            </label>
            <input
              type="text"
              value={formData.operatingHours}
              onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-amber-200 transition-all text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-rose-200"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Card */}
      <div className="p-6 rounded-2xl border border-rose-100 bg-rose-50/50 space-y-6">
        <div>
          <h3 className="font-bold text-base text-slate-800 mb-1">Live Preview</h3>
          <p className="text-xs text-slate-500 font-medium">This is how clients see your clinic.</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-400 to-amber-100 flex items-center justify-center shadow-md shadow-rose-200 mb-4">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-extrabold text-lg text-slate-800">{formData.clinicName}</h4>
            <p className="text-xs font-bold text-rose-500 mt-0.5">{formData.tagline}</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {formData.description}
          </p>
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-2 text-xs text-slate-500 font-medium">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{formData.address}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{formData.operatingHours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
