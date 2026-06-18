'use client';

import { useState } from 'react';
import { Save, User, Mail, Lock, Shield, Phone } from 'lucide-react';

export default function AdminTab() {
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@clinic.com',
    phone: '081-999-9999',
    role: 'Administrator',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Admin profile updated successfully!');
    }, 800);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Edit Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Profile Settings */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg text-slate-800">Admin Profile Settings</h3>
            <p className="text-sm text-slate-500 font-medium">Update your personal information and contact details.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> First Name
                </label>
                <input
                  type="text"
                  required
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Last Name
                </label>
                <input
                  type="text"
                  required
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                />
              </div>
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
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* Security Settings */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg text-slate-800">Security</h3>
            <p className="text-sm text-slate-500 font-medium">Manage your password and account security.</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Current Password
              </label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full md:w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 transition-all text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-200"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Preview Card */}
      <div className="p-6 rounded-2xl border border-rose-100 bg-rose-50/50 space-y-6">
        <div>
          <h3 className="font-bold text-base text-slate-800 mb-1">Admin Identity</h3>
          <p className="text-xs text-slate-500 font-medium">Your internal clinic profile card.</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center shadow-lg shadow-rose-200 text-white text-2xl font-bold border-4 border-white">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </div>
          <div>
            <h4 className="font-extrabold text-lg text-slate-800">{profile.firstName} {profile.lastName}</h4>
            <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-[10px] font-bold text-amber-600">
              <Shield className="w-3 h-3" />
              {profile.role}
            </div>
          </div>
          
          <div className="w-full pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-400 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</span>
              <span className="text-slate-700">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-400 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</span>
              <span className="text-slate-700">{profile.phone || '-'}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-400 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Access</span>
              <span className="text-emerald-600 font-bold">Full Control</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
