import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ChevronRight, AlertCircle } from 'lucide-react';

const PatientDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data representing the full patient list from the backend
  const [patients, setPatients] = useState([
    { id: '101', name: 'Alice Johnson', age: 72, risk: 'Low', lastVisit: 'Oct 12, 2025' },
    { id: '104', name: 'John Doe', age: 78, risk: 'High', lastVisit: 'Sep 28, 2025' },
    { id: '108', name: 'Martha Stewart', age: 81, risk: 'Moderate', lastVisit: 'Sep 05, 2025' },
    { id: '205', name: 'Robert Smith', age: 69, risk: 'Critical', lastVisit: 'Oct 15, 2025' },
    { id: '310', name: 'Eleanor Rigby', age: 85, risk: 'High', lastVisit: 'Aug 20, 2025' },
  ]);

  // Simple frontend filtering for the search bar
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.id.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Patient Directory</h1>
          <p className="text-slate-500 mt-1">View and manage all registered patients.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* The Directory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="px-6 py-4 font-semibold">Patient Name</th>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Age</th>
                <th className="px-6 py-4 font-semibold">Risk Level</th>
                <th className="px-6 py-4 font-semibold">Last Visit</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-800">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">#{patient.id}</td>
                  <td className="px-6 py-4 text-slate-500">{patient.age}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      patient.risk === 'Critical' ? 'bg-red-100 text-red-700' :
                      patient.risk === 'High' ? 'bg-orange-100 text-orange-700' :
                      patient.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {['Critical', 'High'].includes(patient.risk) && <AlertCircle className="w-3 h-3" />}
                      {patient.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{patient.lastVisit}</td>
                  <td className="px-6 py-4 text-right">
                    {/* This Link dynamically routes to the Patient Profile we built earlier! */}
                    <Link 
                      to={`/patient/${patient.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View Profile
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No patients found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PatientDirectory;