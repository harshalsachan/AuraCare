import React, { useState } from 'react';
import { UserPlus, Save, AlertCircle } from 'lucide-react';

const AddPatient = () => {
  // State to hold our form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    bloodType: 'A+',
    weight: '',
    initialRisk: 'Low'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending data to the Python/C++ backend
    setTimeout(() => {
      console.log("Data sent to backend to be added to Hash Map & BST:", formData);
      setIsSubmitting(false);
      setSuccessMessage(`${formData.firstName} ${formData.lastName} has been successfully added to the system.`);
      
      // Reset form
      setFormData({
        firstName: '', lastName: '', age: '', bloodType: 'A+', weight: '', initialRisk: 'Low'
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <UserPlus className="w-8 h-8 text-blue-600" />
          Register New Patient
        </h1>
        <p className="text-slate-500 mt-1">Enter patient details to create a new profile in the database.</p>
      </header>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
          <Save className="w-5 h-5" />
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Jane"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Doe"
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Age</label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              required 
              min="0"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. 75"
            />
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Weight (kg)</label>
            <input 
              type="number" 
              name="weight" 
              value={formData.weight} 
              onChange={handleChange} 
              required 
              min="0"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. 68"
            />
          </div>

          {/* Blood Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Blood Type</label>
            <select 
              name="bloodType" 
              value={formData.bloodType} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Initial Risk Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
              Initial Risk Assessment
              <AlertCircle className="w-4 h-4 text-slate-400" />
            </label>
            <select 
              name="initialRisk" 
              value={formData.initialRisk} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            >
              <option value="Low">Low Risk</option>
              <option value="Moderate">Moderate Risk</option>
              <option value="High">High Risk</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-4">
          <button 
            type="button" 
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Saving to Database...' : 'Save Patient Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;