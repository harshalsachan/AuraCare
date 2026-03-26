import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const WaitingRoom = () => {
  // Mock data representing what the Python/C++ backend will send
  const [queue, setQueue] = useState([
    { id: 101, name: "Alice Johnson", task: "Check Morning Blood Pressure", time: "08:00 AM" },
    { id: 104, name: "John Doe", task: "Administer Medication", time: "08:30 AM" },
    { id: 108, name: "Martha Stewart", task: "Physical Therapy Routine", time: "09:15 AM" }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-slate-800">Waiting Room (Tasks)</h2>
      </div>
      
      <div className="p-0">
        <ul className="divide-y divide-slate-100">
          {queue.map((patient, index) => (
            <li key={patient.id} className="px-6 py-4 hover:bg-slate-50 flex items-center justify-between transition-colors">
              <div>
                <p className="font-medium text-slate-800">{patient.name}</p>
                <p className="text-sm text-slate-500">{patient.task} • {patient.time}</p>
              </div>
              <button className="text-sm flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 px-3 py-1.5 rounded-md transition-colors">
                <CheckCircle className="w-4 h-4" />
                Done
              </button>
            </li>
          ))}
          {queue.length === 0 && (
            <div className="px-6 py-8 text-center text-slate-400">
              No pending tasks. Great job!
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WaitingRoom;