import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, Activity, AlertCircle } from 'lucide-react';
import MobilityTrendChart from './MobilityTrendChart';
import VisitHistory from './VisitHistory';
import MetricsCards from './MetricsCards';
const PatientProfile = () => {
  const { id } = useParams(); // Grabs the ID from the URL
  
  // Mock data: Simulating the O(1) Hash Map lookup from the backend
  const [patient, setPatient] = useState({
    name: "John Doe",
    age: 78,
    bloodType: "A+",
    weight: "72 kg",
    status: "High Risk"
  });

  // Mock data: Simulating the Linked List visit history
  const [visitHistory, setVisitHistory] = useState([
    { date: "Oct 12, 2025", notes: "Reported slight dizziness. Adjusted BP meds." },
    { date: "Sep 28, 2025", notes: "Routine checkup. Vitals stable." },
    { date: "Sep 05, 2025", notes: "Fall assessment. Prescribed walking aid." }
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Patient Header Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start gap-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <User className="w-10 h-10" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-800">{patient.name}</h1>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {patient.status}
            </span>
          </div>
          <div className="mt-2 flex gap-4 text-slate-500">
            <p>ID: {id}</p>
            <p>Age: {patient.age}</p>
            <p>Blood: {patient.bloodType}</p>
            <p>Weight: {patient.weight}</p>
          </div>
        </div>
      </div>

      <MetricsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Co
        lumn: AI Chart (Takes up 2/3 of the space) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Mobility AI Predictor (30-Day Trend)
            </h2>
            {/* The Recharts Component */}
            <MobilityTrendChart />
          </div>
        </div>

        {/* Right Column: Linked List Visit History */}
        <VisitHistory patientId={id} />
       

      </div>
    </div>
  );
};

export default PatientProfile;