import { Activity, Calendar, Layers, Sparkles, Toolbox, Users, UserCog } from 'lucide-react';

export type Tab = 'overview' | 'patients' | 'appointments' | 'about' | 'service' | 'admin' | 'loginConfig';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between shrink-0">
      <div>
        {/* Logo Brand */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-400 to-amber-100 flex items-center justify-center shadow-lg shadow-rose-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-00">
              AURA
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Clinic Manager
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          <button
            onClick={() => onTabChange('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-md shadow-rose-200'
                : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <Activity className="w-4 h-4" />
            Overview Dashboard
          </button>

          <button
            onClick={() => onTabChange('patients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'patients'
                ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-md shadow-rose-200'
                : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <Users className="w-4 h-4" />
            Patients Directory
          </button>

          <button
            onClick={() => onTabChange('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'appointments'
                ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-md shadow-rose-200'
                : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Appointments
          </button>

          <button
            onClick={() => onTabChange('about')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-md shadow-rose-200'
                : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            About
          </button>
          <button
            onClick={() => onTabChange('service')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'service'
                ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-md shadow-rose-200'
                : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <Toolbox className="w-4 h-4" />
            Service
          </button>

          <button
            onClick={() => onTabChange('admin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-md shadow-rose-200'
                : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <UserCog className="w-4 h-4" />
            Admin Profile
          </button>
        </nav>
      </div>

      {/* User Info / Settings Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 font-bold text-sm">
            AD
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700">Administrator</p>
            <p className="text-[10px] text-slate-500">admin@clinic.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
