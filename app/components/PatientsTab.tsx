'use client';

import { AlertCircle, UserPlus, Users } from 'lucide-react';
import { Patient, PatientForm } from '@/app/types/dashboard';

interface PatientsTabProps {
  // Data
  patients: Patient[];
  filteredPatients: Patient[];
  loading: boolean;
  actionLoading: boolean;
  // Form state
  patientForm: PatientForm;
  onPatientFormChange: (form: PatientForm) => void;
  // Handlers
  onCreatePatient: (e: React.FormEvent) => void;
}

export default function PatientsTab({
  filteredPatients,
  loading,
  actionLoading,
  patientForm,
  onPatientFormChange,
  onCreatePatient,
}: PatientsTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Register New Patient Form */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-800">Register New Patient</h3>
          <p className="text-xs text-slate-500">Add demography. Hospital Number will generate sequentially.</p>
        </div>

        <form onSubmit={onCreatePatient} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                First Name
              </label>
              <input
                type="text"
                required
                value={patientForm.firstName}
                onChange={(e) => onPatientFormChange({ ...patientForm, firstName: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                required
                value={patientForm.lastName}
                onChange={(e) => onPatientFormChange({ ...patientForm, lastName: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider text-left">
              Phone Number
            </label>
            <input
              type="text"
              required
              value={patientForm.phone}
              onChange={(e) => onPatientFormChange({ ...patientForm, phone: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
              placeholder="081-234-5678"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Birth Date
              </label>
              <input
                type="date"
                required
                value={patientForm.birthDate}
                onChange={(e) => onPatientFormChange({ ...patientForm, birthDate: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Gender
              </label>
              <select
                value={patientForm.gender}
                onChange={(e) => onPatientFormChange({ ...patientForm, gender: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Congenital Disease (Optional)
            </label>
            <input
              type="text"
              value={patientForm.congenitalDisease}
              onChange={(e) => onPatientFormChange({ ...patientForm, congenitalDisease: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
              placeholder="e.g. Asthma, Diabetes"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Allergic Drugs (Optional)
            </label>
            <input
              type="text"
              value={patientForm.allergicDrugs}
              onChange={(e) => onPatientFormChange({ ...patientForm, allergicDrugs: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
              placeholder="e.g. Penicillin, Ibuprofen"
            />
          </div>

          <button
            type="submit"
            disabled={actionLoading}
            className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-amber-400 transition-all text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-rose-200"
          >
            <UserPlus className="w-4 h-4" />
            Register Patient
          </button>
        </form>
      </div>

      {/* Patient List Directory */}
      <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-800">Registered Patients</h3>
          <p className="text-xs text-slate-500">Detailed overview of clinic records database.</p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-16 bg-slate-50 animate-pulse rounded-xl border border-slate-100" />
            ))}
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="h-64 border border-dashed border-slate-300 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-center p-6">
            <Users className="w-12 h-12 text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-600">No matching patient records found</p>
            <p className="text-xs text-slate-500 mt-1">Register one in the left panel or click Quick Seed Data!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold text-xs uppercase bg-slate-50">
                  <th className="p-3 rounded-tl-lg">HN</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Age / Gender</th>
                  <th className="p-3 rounded-tr-lg">Clinical Warning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((patient) => {
                  const age = new Date().getFullYear() - new Date(patient.birthDate).getFullYear();
                  return (
                    <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono text-xs font-bold text-rose-500">{patient.hn}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-800">
                          {patient.firstName} {patient.lastName}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-slate-600 font-medium">{patient.phone}</td>
                      <td className="p-3 text-xs text-slate-600">
                        <span className="font-medium">{age} yrs</span> / <span className="text-slate-500 font-medium">{patient.gender}</span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          {patient.congenitalDisease && (
                            <div className="text-[10px] text-amber-600 flex items-center gap-1 font-medium bg-amber-50 px-2 py-0.5 rounded-full inline-flex">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              {patient.congenitalDisease}
                            </div>
                          )}
                          {patient.allergicDrugs ? (
                            <div className="text-[10px] text-rose-600 flex items-center gap-1 font-bold bg-rose-50 px-2 py-0.5 rounded-full inline-flex mt-1">
                              <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                              Allergy: {patient.allergicDrugs}
                            </div>
                          ) : (
                            !patient.congenitalDisease && (
                              <span className="text-[10px] text-slate-400 italic">None logged</span>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
