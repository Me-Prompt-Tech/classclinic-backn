'use client';

import { useState } from 'react';
import { PlusCircle, Syringe, Trash2 } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
}

export default function ServiceTab() {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: '1', name: 'Botox Allergan 100u', category: 'Injection', price: 15000, duration: '30 mins' },
    { id: '2', name: 'Juvederm Voluma 1cc', category: 'Filler', price: 18000, duration: '45 mins' },
    { id: '3', name: 'PicoSure Laser (Full Face)', category: 'Laser', price: 5000, duration: '40 mins' },
    { id: '4', name: 'Ultraformer III (400 shots)', category: 'Lifting', price: 20000, duration: '60 mins' },
  ]);

  const [form, setForm] = useState({
    name: '',
    category: 'Injection',
    price: '',
    duration: '',
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    
    const newService: ServiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      duration: form.duration || '30 mins',
    };
    
    setServices([newService, ...services]);
    setForm({ name: '', category: 'Injection', price: '', duration: '' });
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Add Service Form */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-800">Add New Service</h3>
          <p className="text-xs text-slate-500">Create a new treatment offering for your clinic.</p>
        </div>

        <form onSubmit={handleAddService} className="space-y-3">
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Service Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
              placeholder="e.g. Botox Allergan 50u"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
            >
              <option value="Injection">Injection</option>
              <option value="Filler">Filler</option>
              <option value="Laser">Laser</option>
              <option value="Facial">Facial Treatment</option>
              <option value="Lifting">Lifting</option>
              <option value="IV Drip">IV Drip / Vitamin</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Price (THB)
              </label>
              <input
                type="number"
                required
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
                placeholder="15000"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Duration
              </label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-slate-800"
                placeholder="e.g. 30 mins"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-amber-400 transition-all text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-rose-200 mt-2"
          >
            <PlusCircle className="w-4 h-4" />
            Save Service
          </button>
        </form>
      </div>

      {/* Services Directory */}
      <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-800">Clinic Services & Treatments</h3>
          <p className="text-xs text-slate-500">Manage all available aesthetic procedures and their pricing.</p>
        </div>

        {services.length === 0 ? (
          <div className="h-64 border border-dashed border-slate-300 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-center p-6">
            <Syringe className="w-12 h-12 text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-600">No services found</p>
            <p className="text-xs text-slate-500 mt-1">Add a new service on the left panel to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold text-xs uppercase bg-slate-50">
                  <th className="p-3 rounded-tl-lg">Service / Treatment</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3 text-right">Price (THB)</th>
                  <th className="p-3 text-right rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-3">
                      <div className="font-bold text-slate-800">
                        {service.name}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-slate-100 text-slate-600 border border-slate-200">
                        {service.category}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-slate-600 font-medium">
                      {service.duration}
                    </td>
                    <td className="p-3 text-right font-bold text-rose-500">
                      ฿{service.price.toLocaleString()}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
