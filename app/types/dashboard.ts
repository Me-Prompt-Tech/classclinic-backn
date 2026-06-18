// Shared type definitions across dashboard components

export interface Patient {
  id: string;
  hn: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  gender: string;
  congenitalDisease?: string | null;
  allergicDrugs?: string | null;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient: Patient;
  appointmentDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string | null;
  doctorName: string;
  createdAt: string;
}

export interface Stats {
  totalPatientsToday: number;
  activeAppointments: number;
  dailyRevenue: number;
}

export interface PatientForm {
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  gender: string;
  congenitalDisease: string;
  allergicDrugs: string;
}

export interface AppointmentForm {
  patientId: string;
  appointmentDate: string;
  doctorName: string;
  notes: string;
}
