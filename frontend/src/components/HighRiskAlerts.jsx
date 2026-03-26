import React, { useState } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HighRiskAlerts = () => {
  // Mock data representing the top results pulled from the BST
  const [alerts, setAlerts] = useState([
    { id: 205, name: "Robert Smith", reason: "Declining Mobility AI Prediction", riskLevel: "Critical" },
    { id: 310, name: "Eleanor Rigby", reason: "Missed 3 consecutive check-ins", riskLevel: "High" }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
      <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h2 className="text-lg font-semibold text-red-800">High-Risk Patients</h2>
      </div>
      
      <div className="p-0">
        <ul className="divide-y divide-slate-100">
          {alerts.map((patient) => (
            <li key={patient.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-800">{patient.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    patient.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {patient.riskLevel}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{patient.reason}</p>
              </div>
              
              {/* This links to our dynamic /patient/:id route to fire the Hash Map lookup! */}
              <Link 
                to={`/patient/${patient.id}`}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="View Profile"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </li>
          ))}
          {alerts.length === 0 && (
            <div className="px-6 py-8 text-center text-slate-400">
              No high-risk alerts at this time.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HighRiskAlerts;