import axios from 'axios';

// Create a configured Axios instance
// In development, this points to your friend's Python Flask/FastAPI server
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches the Python port
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// VITALTRACK API ENDPOINTS
// ==========================================

// 1. The Queue (First-In, First-Out Tasks)
// Used in: Dashboard.jsx -> WaitingRoom.jsx
export const getWaitingRoomTasks = () => API.get('/waiting-room');
export const completeTask = (taskId) => API.post(`/waiting-room/complete/${taskId}`);

// 2. The BST (High-Risk Patients Sorted)
// Used in: Dashboard.jsx -> HighRiskAlerts.jsx
export const getHighRiskAlerts = () => API.get('/patients/high-risk');

// 3. The Hash Map (O(1) Profile Lookup)
// Used in: PatientProfile.jsx
export const getPatientProfile = (patientId) => API.get(`/patients/${patientId}`);

// 4. The Linked List (Chronological Visit History)
// Used in: PatientProfile.jsx -> VisitHistory.jsx
export const getVisitHistory = (patientId) => API.get(`/patients/${patientId}/visits`);
export const addVisitLog = (patientId, visitData) => API.post(`/patients/${patientId}/visits`, visitData); // Pushes to the front of the Linked List

// 5. The AI Model (Linear Regression Trend)
// Used in: PatientProfile.jsx -> MobilityTrendChart.jsx
export const getMobilityTrend = (patientId) => API.get(`/patients/${patientId}/mobility-prediction`);

export default API;