'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/app/components/Sidebar';
import PatientsTab from '@/app/components/PatientsTab';
import AboutTab from '@/app/components/AboutTab';
import ServiceTab from '@/app/components/ServiceTab';
import type { Stats, Patient, Appointment, PatientForm } from '@/app/types/dashboard';
import {
  DollarSign,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Users,
  Calendar,
  ChevronRight,
  AlertCircle,
  PlusCircle,
} from 'lucide-react';


export default function Home() {
  // Tabs: 'overview' | 'patients' | 'appointments'
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'appointments'>('overview');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // States
  const [stats, setStats] = useState<Stats>({
    totalPatientsToday: 0,
    activeAppointments: 0,
    dailyRevenue: 0,
  });
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // New Patient Form State
  const [patientForm, setPatientForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
    gender: 'Female',
    congenitalDisease: '',
    allergicDrugs: '',
  });

  // New Appointment Form State
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: '',
    appointmentDate: '',
    doctorName: 'Dr. Sarah Smith',
    notes: '',
  });

  const showToast = useCallback((text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  }, []);

  // Fetch all dashboard data
  const fetchData = useCallback(async (showSilently = false) => {
    if (!showSilently) {
      setTimeout(() => setLoading(true), 0);
    }
    try {
      // Fetch stats
      const statsRes = await fetch('/api/dashboard/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch patients
      const patientsRes = await fetch('/api/patients');
      if (patientsRes.ok) {
        const patientsData = await patientsRes.json();
        setPatients(patientsData);
      }

      // Fetch appointments
      const apptsRes = await fetch('/api/appointments');
      if (apptsRes.ok) {
        const apptsData = await apptsRes.json();
        setAppointments(apptsData);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      showToast('Error connecting to backend APIs. Check server connection.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchData();
    });
  }, [fetchData]);

  // Trigger quick seeding of mock data to verify end-to-end flow easily
  const triggerQuickSeed = async () => {
    setActionLoading(true);
    try {
      // 1. Create a mock patient
      const mockPatientsList = [
        { firstName: 'Emily', lastName: 'Watson', phone: '0897654321', birthDate: '1992-05-12', gender: 'Female', congenitalDisease: 'None', allergicDrugs: 'Aspirin' },
        { firstName: 'Michael', lastName: 'Chang', phone: '0812345678', birthDate: '1988-11-20', gender: 'Male', congenitalDisease: 'Hypertension', allergicDrugs: 'None' },
        { firstName: 'Sophia', lastName: 'Loren', phone: '0854321987', birthDate: '1996-03-08', gender: 'Female', congenitalDisease: 'None', allergicDrugs: 'Penicillin' },
      ];

      const patientIds: string[] = [];

      for (const p of mockPatientsList) {
        const res = await fetch('/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(p),
        });
        if (res.ok) {
          const data = await res.json();
          patientIds.push(data.id);
        }
      }

      // 2. Create mock appointments for seed patients
      if (patientIds.length > 0) {
        const doctors = ['Dr. Sarah Smith', 'Dr. Alexander King', 'Dr. Helena Roy'];
        const notesList = ['Botox forehead treatment', 'Filler touch-up lip area', 'Laser skin rejuvenation session'];

        for (let i = 0; i < patientIds.length; i++) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + i + 1);
          tomorrow.setHours(10 + i * 2, 0, 0, 0);

          await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              patientId: patientIds[i],
              appointmentDate: tomorrow.toISOString(),
              doctorName: doctors[i % doctors.length],
              notes: notesList[i % notesList.length],
            }),
          });
        }
      }

      showToast('Seeded mock patients and appointments successfully!', 'success');
      fetchData(true);
    } catch (err) {
      console.error(err);
      showToast('Failed to execute automatic seed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Create patient handler
  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientForm),
      });

      if (res.ok) {
        const newPatient = await res.json();
        showToast(`Registered Patient successfully! HN: ${newPatient.hn}`, 'success');
        setPatientForm({
          firstName: '',
          lastName: '',
          phone: '',
          birthDate: '',
          gender: 'Female',
          congenitalDisease: '',
          allergicDrugs: '',
        });
        fetchData(true);
      } else {
        const errorData = await res.json();
        showToast(errorData.error || 'Failed to create patient', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error occurred', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Create appointment handler
  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentForm),
      });

      if (res.ok) {
        showToast('Created appointment booking successfully!', 'success');
        setAppointmentForm({
          patientId: '',
          appointmentDate: '',
          doctorName: 'Dr. Sarah Smith',
          notes: '',
        });
        fetchData(true);
      } else {
        const errorData = await res.json();
        showToast(errorData.error || 'Failed to schedule appointment', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error occurred', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Update appointment status (PUT handler)
  const updateAppointmentStatus = async (id: string, newStatus: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED') => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        showToast(`Appointment status updated to ${newStatus}!`, 'success');
        fetchData(true);
      } else {
        const errorData = await res.json();
        showToast(errorData.error || 'Failed to update status', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error occurred', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter lists based on query
  const filteredPatients = patients.filter(
    (p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
  );

  const filteredAppointments = appointments.filter(
    (a) =>
      `${a.patient?.firstName} ${a.patient?.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patient?.hn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Toast Messages */}
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl border flex items-center gap-3 transition-all duration-300 max-w-md ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
          <p className="text-sm font-bold">{message.text}</p>
        </div>
      )}

      {/* Sidebar navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, HN, or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Seed Mock Action */}
            <button
              onClick={triggerQuickSeed}
              disabled={actionLoading}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 transition-all cursor-pointer disabled:opacity-50"
              title="Adds mock patients and appointments through your Next.js api routes for verification."
            >
              <PlusCircle className="w-4 h-4" />
              Quick Seed Data
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => fetchData(false)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all cursor-pointer shadow-sm"
              title="Refresh API Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-rose-500' : ''}`} />
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section: Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Header Titles */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-800">Clinic Status</h2>
                  <p className="text-sm text-slate-500 font-medium">Real-time metrics computed from your Prisma Postgres database.</p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Metric 1 */}
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm relative overflow-hidden group hover:border-rose-200 hover:shadow-md transition-all">
                  <div className="absolute -top-4 -right-4 p-6 opacity-[0.05] text-rose-500 group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-600">Patients Today</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    {loading ? (
                      <span className="inline-block w-16 h-8 bg-slate-100 animate-pulse rounded-md" />
                    ) : (
                      stats.totalPatientsToday
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 font-medium">New medical records created today</p>
                </div>

                {/* Metric 2 */}
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm relative overflow-hidden group hover:border-amber-200 hover:shadow-md transition-all">
                  <div className="absolute -top-4 -right-4 p-6 opacity-[0.05] text-amber-500 group-hover:scale-110 transition-transform duration-500">
                    <Calendar className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-600">Active Bookings</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    {loading ? (
                      <span className="inline-block w-16 h-8 bg-slate-100 animate-pulse rounded-md" />
                    ) : (
                      stats.activeAppointments
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Pending and Confirmed slots</p>
                </div>

                {/* Metric 3 */}
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm relative overflow-hidden group hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="absolute -top-4 -right-4 p-6 opacity-[0.05] text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                    <DollarSign className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-600">Daily Revenue</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    {loading ? (
                      <span className="inline-block w-24 h-8 bg-slate-100 animate-pulse rounded-md" />
                    ) : (
                      `$${stats.dailyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Based on treatments logged today</p>
                </div>
              </div>

              {/* Quick Actions & Recent Activity layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Appointments table preview */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-800">Today&apos;s Scheduled Slots</h3>
                      <p className="text-xs text-slate-500 font-medium">Mutate status values live to see dashboard metrics update.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-all bg-rose-50 px-3 py-1.5 rounded-lg"
                    >
                      View All <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((n) => (
                         <div key={n} className="h-14 bg-slate-50 animate-pulse rounded-xl border border-slate-100" />
                      ))}
                    </div>
                  ) : filteredAppointments.length === 0 ? (
                    <div className="h-48 border border-dashed border-slate-300 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-center p-4">
                      <Calendar className="w-8 h-8 text-slate-400 mb-2" />
                      <p className="text-sm font-bold text-slate-600">No appointments scheduled</p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        Use &quot;Quick Seed Data&quot; top-right to populate sample values!
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 font-bold text-xs uppercase bg-slate-50">
                            <th className="p-3 rounded-tl-lg">Patient / HN</th>
                            <th className="p-3">Schedule</th>
                            <th className="p-3">Doctor</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right rounded-tr-lg">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredAppointments.slice(0, 5).map((appt) => (
                            <tr key={appt.id} className="group hover:bg-slate-50/80 transition-colors">
                              <td className="p-3">
                                <div className="font-bold text-slate-800">
                                  {appt.patient?.firstName} {appt.patient?.lastName}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono font-medium">{appt.patient?.hn}</div>
                              </td>
                              <td className="p-3 text-xs text-slate-600 font-medium">
                                {new Date(appt.appointmentDate).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                                <div className="text-[10px] text-slate-500 mt-0.5">
                                  {new Date(appt.appointmentDate).toLocaleTimeString(undefined, {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </div>
                              </td>
                              <td className="p-3 text-xs text-slate-600 font-medium">{appt.doctorName}</td>
                              <td className="p-3">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                                    appt.status === 'CONFIRMED'
                                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                      : appt.status === 'COMPLETED'
                                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                      : appt.status === 'CANCELLED'
                                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                                  }`}
                                >
                                  {appt.status}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                  {appt.status === 'PENDING' && (
                                    <button
                                      onClick={() => updateAppointmentStatus(appt.id, 'CONFIRMED')}
                                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-all text-xs"
                                      title="Confirm Appointment"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  {(appt.status === 'PENDING' || appt.status === 'CONFIRMED') && (
                                    <button
                                      onClick={() => updateAppointmentStatus(appt.id, 'COMPLETED')}
                                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-all text-xs"
                                      title="Mark Completed"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  {appt.status !== 'CANCELLED' && appt.status !== 'COMPLETED' && (
                                    <button
                                      onClick={() => updateAppointmentStatus(appt.id, 'CANCELLED')}
                                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all text-xs"
                                      title="Cancel Slot"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Patient list preview */}
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-800">Recent Patients</h3>
                    <button
                      onClick={() => setActiveTab('patients')}
                      className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-all bg-rose-50 px-3 py-1.5 rounded-lg"
                    >
                      View All <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="h-14 bg-slate-50 animate-pulse rounded-xl border border-slate-100" />
                      ))}
                    </div>
                  ) : filteredPatients.length === 0 ? (
                    <div className="h-48 border border-dashed border-slate-300 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-center p-4">
                      <Users className="w-8 h-8 text-slate-400 mb-2" />
                      <p className="text-sm font-bold text-slate-600">No patients registered</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPatients.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-rose-200 hover:bg-white hover:shadow-sm transition-all group"
                        >
                          <div className="min-w-0">
                            <div className="font-bold text-sm text-slate-800 truncate group-hover:text-rose-600 transition-colors">
                              {p.firstName} {p.lastName}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5 font-medium">{p.hn}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs text-slate-600 font-bold">{p.phone}</span>
                            <div className="text-[10px] text-amber-600 font-bold uppercase tracking-wider mt-0.5">
                              {p.gender}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Section: Patients Directory Tab */}
          {activeTab === 'patients' && (
            <PatientsTab
              patients={patients}
              filteredPatients={filteredPatients}
              loading={loading}
              actionLoading={actionLoading}
              patientForm={patientForm}
              onPatientFormChange={setPatientForm}
              onCreatePatient={handleCreatePatient}
            />
          )}

          {/* Section: Appointments Scheduler Tab */}
          {activeTab === 'appointments' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Schedule New Appointment Form */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Book Appointment</h3>
                  <p className="text-xs text-slate-500 font-medium">Select patient and physician credentials.</p>
                </div>

                <form onSubmit={handleCreateAppointment} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Select Patient
                    </label>
                    <select
                      required
                      value={appointmentForm.patientId}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, patientId: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                    >
                      <option value="">-- Select Patient --</option>
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          [{p.hn}] {p.firstName} {p.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Appointment Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={appointmentForm.appointmentDate}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, appointmentDate: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Assigned Physician
                    </label>
                    <select
                      value={appointmentForm.doctorName}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, doctorName: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800 font-medium"
                    >
                      <option value="Dr. Sarah Smith">Dr. Sarah Smith (Dermatologist)</option>
                      <option value="Dr. Alexander King">Dr. Alexander King (Plastic Surgeon)</option>
                      <option value="Dr. Helena Roy">Dr. Helena Roy (Aesthetic Specialist)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Consultation Notes (Optional)
                    </label>
                    <textarea
                      value={appointmentForm.notes}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                      rows={3}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all resize-none text-slate-800 font-medium"
                      placeholder="Details of consultation request..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading || !appointmentForm.patientId}
                    className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-amber-400 transition-all text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-rose-200"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Slot
                  </button>
                </form>
              </div>

              {/* Complete Appointment Directory */}
              <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Appointments Schedule</h3>
                  <p className="text-xs text-slate-500 font-medium">Track and manage client clinical visits.</p>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="h-16 bg-slate-50 animate-pulse rounded-xl border border-slate-100" />
                    ))}
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="h-64 border border-dashed border-slate-300 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-center p-6">
                    <Calendar className="w-12 h-12 text-slate-400 mb-2" />
                    <p className="text-sm font-bold text-slate-600">No scheduled appointments found</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Book a new appointment or use Quick Seed Data!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold text-xs uppercase bg-slate-50">
                          <th className="p-3 rounded-tl-lg">HN / Patient</th>
                          <th className="p-3">Doctor</th>
                          <th className="p-3">Date / Hour</th>
                          <th className="p-3">Consultation Note</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right rounded-tr-lg">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredAppointments.map((appt) => (
                          <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-xs text-rose-500 font-mono">{appt.patient?.hn}</div>
                              <div className="font-bold text-sm text-slate-800 mt-0.5">
                                {appt.patient?.firstName} {appt.patient?.lastName}
                              </div>
                            </td>
                            <td className="p-3 text-xs text-slate-600 font-bold">{appt.doctorName}</td>
                            <td className="p-3 text-xs text-slate-600 font-medium">
                              {new Date(appt.appointmentDate).toLocaleDateString(undefined, {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                              <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                                {new Date(appt.appointmentDate).toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </td>
                            <td className="p-3 text-xs text-slate-500 max-w-[150px] truncate font-medium" title={appt.notes || ''}>
                              {appt.notes || <span className="text-slate-400 italic">No instructions</span>}
                            </td>
                            <td className="p-3">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                                  appt.status === 'CONFIRMED'
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : appt.status === 'COMPLETED'
                                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                    : appt.status === 'CANCELLED'
                                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {appt.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {appt.status === 'PENDING' && (
                                  <button
                                    onClick={() => updateAppointmentStatus(appt.id, 'CONFIRMED')}
                                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-all text-xs"
                                    title="Confirm"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                )}
                                {(appt.status === 'PENDING' || appt.status === 'CONFIRMED') && (
                                  <button
                                    onClick={() => updateAppointmentStatus(appt.id, 'COMPLETED')}
                                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-all text-xs"
                                    title="Mark Completed"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                )}
                                {appt.status !== 'CANCELLED' && appt.status !== 'COMPLETED' && (
                                  <button
                                    onClick={() => updateAppointmentStatus(appt.id, 'CANCELLED')}
                                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all text-xs"
                                    title="Cancel"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section: About Tab */}
          {activeTab === 'about' && (
            <AboutTab />
          )}

          {/* Section: Service Tab */}
          {activeTab === 'service' && (
            <ServiceTab />
          )}
        </div>
      </main>
    </div>
  );
}
